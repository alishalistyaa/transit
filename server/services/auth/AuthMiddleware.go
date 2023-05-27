package auth

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func AuthToken() gin.HandlerFunc {
	return func(context *gin.Context) {
		email, err := ExtractToken(context)

		if err != nil {
			context.JSON(http.StatusUnauthorized, gin.H{"message": err.Error()})
			context.Abort()
			return
		}

		context.Set("email", email)
		context.Next()
	}
}
