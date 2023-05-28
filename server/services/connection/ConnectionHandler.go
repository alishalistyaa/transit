package connection

import (
	"net/http"
	"transit-server/database"
	"transit-server/models"

	"github.com/gin-gonic/gin"
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
