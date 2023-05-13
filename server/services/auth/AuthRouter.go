package auth

import (
	"github.com/gin-gonic/gin"
)

func RouteAuth(router *gin.Engine) {
	authGroup := router.Group("/auth")

	authGroup.GET("/tester", AuthTester)
}
