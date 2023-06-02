package stop

import (
	"net/http"
	"strconv"
	"transit-server/database"
	"transit-server/models"
	"transit-server/services/route"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm/clause"
)

type AddStopInput struct {
	Lat     float64 `json:"lat" binding:"required"`
	Lng     float64 `json:"lng" binding:"required"`
	Name    string  `json:"name" binding:"required"`
	Address string  `json:"address"`
}

func HandleAddStop(context *gin.Context) {
	var input AddStopInput

	if err := context.ShouldBindJSON(&input); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	stop := models.Stop{}

	stop.Name = input.Name
	stop.Lat = input.Lat
	stop.Lng = input.Lng
	if input.Address != "" {
		stop.Address = input.Address
	}

	err := database.DB.Model(models.Stop{}).Create(map[string]interface{}{
		"Name":    stop.Name,
		"coord":   clause.Expr{SQL: "ST_SetSRID(ST_MakePoint(?, ?), 4326)", Vars: []interface{}{stop.Lng, stop.Lat}},
		"Address": stop.Address}).Error

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "success"})
}

func HandleGetStop(context *gin.Context) {
	var result models.Stop

	stopId := context.Query("stopId")

	if stopId == "" {
		context.JSON(http.StatusBadRequest, gin.H{"message": "stop id must be provided"})
		return
	}

	err := database.DB.Model(models.Stop{}).Select("name, ST_X(coord) AS lng, ST_Y(coord) AS lat, address").Where("stop_id = ?", stopId).First(&result).Error

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": result})
}

type DeleteStopInput struct {
	StopId uint `json:"stopId" binding:"required"`
}

func HandleDeleteStop(context *gin.Context) {
	var input DeleteStopInput

	if err := context.ShouldBindJSON(&input); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	err := database.DB.Delete(&models.Stop{}, input.StopId).Error

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "success"})
}

func HandleGetNearestStop(context *gin.Context) {
	var stops []models.Stop

	currLat, parseErr1 := strconv.ParseFloat(context.Query("lat"), 64)
	currLng, parseErr2 := strconv.ParseFloat(context.Query("lng"), 64)

	if parseErr1 != nil || parseErr2 != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "unable to parse query parameter"})
		return
	}

	err := database.DB.Model(models.Stop{}).Select("stop_id, name, ST_X(coord) AS lng, ST_Y(coord) AS lat, address").Find(&stops).Error

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	minDistance := 4 * 6371.0
	minIndex := 0
	for i := 0; i < len(stops); i++ {
		currDistance := route.HaversineDistance(route.Coordinate{Lat: stops[i].Lat, Lng: stops[i].Lng}, route.Coordinate{Lat: currLat, Lng: currLng})

		if currDistance < minDistance {
			minIndex = i
			minDistance = currDistance
		}
	}

	context.JSON(http.StatusOK, gin.H{"message": stops[minIndex]})
}
