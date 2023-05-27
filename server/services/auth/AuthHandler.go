package auth

import (
	"net/http"
	"transit-server/models"

	"github.com/gin-gonic/gin"
)

func AuthTester(context *gin.Context) {
	context.JSON(http.StatusOK, gin.H{
		"message": "hello",
	})
}

type SignupInput struct {
	Email    string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required"`
}

func Signup(context *gin.Context) {
	var input SignupInput

	if err := context.ShouldBindJSON(&input); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	user := models.User{}
	user.Email = input.Email
	user.Password = input.Password

	_, err := user.SaveUser()

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "success"})
}
