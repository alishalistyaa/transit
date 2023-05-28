package stop

import (
	"net/http"
	"transit-server/database"
	"transit-server/models"

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
		"coord":   clause.Expr{SQL: "ST_MakePoint(?, ?)", Vars: []interface{}{stop.Lng, stop.Lat}},
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

type ConnectStopInput struct {
	FirstStopId  uint `json:"firstStopId" binding:"required"`
	SecondStopId uint `json:"secondStopId" binding:"required"`
}

func HandleConnectStop(context *gin.Context) {
	var input ConnectStopInput

	if err := context.ShouldBindJSON(&input); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	connection := models.Connection{}
	connection.FirstStopId = input.FirstStopId
	connection.SecondStopId = input.SecondStopId

	err := database.DB.Create(&connection).Error

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "success"})
}

type DeleteConnectionInput struct {
	FirstStopId  uint `json:"firstStopId" binding:"required"`
	SecondStopId uint `json:"secondStopId" binding:"required"`
}

func HandleDeleteConnection(context *gin.Context) {
	var input DeleteConnectionInput

	if err := context.ShouldBindJSON(&input); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	connection := models.Connection{}
	connection.FirstStopId = input.FirstStopId
	connection.SecondStopId = input.SecondStopId

	err := database.DB.Delete(&connection).Error

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "success"})

}
