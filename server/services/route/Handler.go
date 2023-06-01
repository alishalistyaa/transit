package route

import (
	"net/http"
	"strconv"
	"transit-server/database"
	"transit-server/models"

	"github.com/gin-gonic/gin"
)

type Coordinate struct {
	Lat float64
	Lng float64
}

type GetRouteResult struct {
	Stops []models.Stop
	Path  []Coordinate
}

func HandleGetRoute(context *gin.Context) {
	var (
		result      GetRouteResult
		stops       []models.Stop
		connections []models.Connection
		srcIndex    int
		destIndex   int
	)

	destLng, parseErr1 := strconv.ParseFloat(context.Query("destLng"), 64)
	destLat, parseErr2 := strconv.ParseFloat(context.Query("destLat"), 64)
	stopId, parseErr3 := strconv.ParseUint(context.Query("stopId"), 10, 32)

	if parseErr1 != nil || parseErr2 != nil || parseErr3 != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "unable to parse query parameter"})
		return
	}

	err := database.DB.Model(models.Stop{}).Select("stop_id, name, ST_X(coord) AS lng, ST_Y(coord) AS lat, address").Find(&stops).Error

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	err = database.DB.Find(&connections).Error

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	minDistance := 4 * 6371.0
	for i := 0; i < len(stops); i++ {
		if stops[i].StopId == uint(stopId) {
			srcIndex = i
		}

		currDistance := HaversineDistance(Coordinate{stops[i].Lat, stops[i].Lng}, Coordinate{destLat, destLng})

		if currDistance < minDistance {
			destIndex = i
			minDistance = currDistance
		}
	}

	result, err = FindPath(stops, connections, srcIndex, destIndex)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": result})
}
