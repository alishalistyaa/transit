package user

import (
	"transit-server/services/auth"

	"github.com/gin-gonic/gin"
)

func RouteUser(router *gin.RouterGroup) {
	userGroup := router.Group("/user")

	userGroup.POST("/", auth.ValidateToken(), HandleGetUserData)
}
