package user

import (
	"fmt"
	"net/http"
	"transit-server/database"
	"transit-server/models"

	"github.com/gin-gonic/gin"
)

func HandleGetUserData(context *gin.Context) {
	email, ok := context.Get("email")
	fmt.Println(context)

	if !ok {
		context.JSON(http.StatusUnauthorized, gin.H{"message": "invalid token"})
		return
	}

	user := models.User{}
	err := database.DB.Model(models.User{}).Select("user_id, email, name, address, phone, age").Where("email = ?", email).First(&user).Error

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": user})
}
