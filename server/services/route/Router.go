package route

import (
	"transit-server/services/auth"

	"github.com/gin-gonic/gin"
)

func RouteRoutes(router *gin.RouterGroup) {
	routesGroup := router.Group("/routes")

	routesGroup.GET("/", auth.ValidateToken(), HandleGetRoute)
}
