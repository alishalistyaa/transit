package auth

import (
	"github.com/gin-gonic/gin"
)

func RouteAuth(router *gin.RouterGroup) {
	authGroup := router.Group("/auth")

	authGroup.POST("/signup", Signup)
	authGroup.POST("/login", Login)
	authGroup.GET("/tester", AuthToken(), AuthTester)
}
