package auth

import (
	"github.com/gin-gonic/gin"
)

func RouteAuth(router *gin.Engine) {
	router.GET("/auth/tester", AuthTester)
}
