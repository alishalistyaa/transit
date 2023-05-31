package auth

import (
	"net/http"
	"transit-server/database"
	"transit-server/models"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

type SignupInput struct {
	Email    string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required"`
}

func HandleSignup(context *gin.Context) {
	var (
		input SignupInput
		token string
	)

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

	token, err = GenerateToken(input.Email)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": token})
}

type LoginInput struct {
	Email    string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required"`
}

func HandleLogin(context *gin.Context) {
	var (
		input LoginInput
		token string
	)

	if err := context.ShouldBindJSON((&input)); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	user := models.User{}
	err := database.DB.Model(models.User{}).Where("email = ?", input.Email).Take(&user).Error

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(input.Password))

	if err != nil && err == bcrypt.ErrMismatchedHashAndPassword {
		context.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	token, err = GenerateToken(input.Email)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": token})
}

func HandleValidate(context *gin.Context) {
	_, err := ExtractToken(context)

	if err != nil {
		context.JSON(http.StatusUnauthorized, gin.H{"message": err.Error()})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "authorized"})
}
