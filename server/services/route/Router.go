package route

import "github.com/gin-gonic/gin"

func RouteRoutes(router *gin.RouterGroup) {
	routesGroup := router.Group("/routes")

	routesGroup.GET("/", HandleGetRoute)
}
