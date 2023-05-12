package auth

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func AuthTester(context *gin.Context) {
	context.JSON(http.StatusOK, gin.H{
		"message": "hello",
	})
}
