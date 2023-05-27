package auth

import (
	"github.com/gin-gonic/gin"
)

func RouteAuth(router *gin.RouterGroup) {
	authGroup := router.Group("/auth")

	authGroup.GET("/tester", AuthTester)
	authGroup.POST("/signup", Signup)
}
