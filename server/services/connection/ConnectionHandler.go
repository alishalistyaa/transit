package connection

import (
	"net/http"
	"transit-server/database"
	"transit-server/models"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm/clause"
)

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

type ConnPointInput struct {
	FirstStopId  uint    `json:"firstStopId" binding:"required"`
	SecondStopId uint    `json:"secondStopId" binding:"required"`
	Lat          float64 `json:"lat" binding:"required"`
	Lng          float64 `json:"lng" binding:"required"`
}

func HandleAddConnPoint(context *gin.Context) {
	var input ConnPointInput

	if err := context.ShouldBindJSON(&input); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	err := database.DB.Model(models.ConnectionPoint{}).Create(map[string]interface{}{
		"FirstStopId":  input.FirstStopId,
		"SecondStopId": input.SecondStopId,
		"point_coord":  clause.Expr{SQL: "ST_MakePoint(?, ?)", Vars: []interface{}{input.Lng, input.Lat}}}).Error

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "success"})
}

func HandleDeleteConnPoint(context *gin.Context) {
	var input ConnPointInput

	if err := context.ShouldBindJSON(&input); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	connPoint := models.ConnectionPoint{}
	connPoint.FirstStopId = input.FirstStopId
	connPoint.SecondStopId = input.SecondStopId

	err := database.DB.Where("ST_Equals(point_coord, ST_SetSRID(ST_MakePoint(?, ?), 4326))", input.Lng, input.Lat).Delete(&connPoint).Error

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "success"})
}
