package connection

import "github.com/gin-gonic/gin"

func RouteConnection(router *gin.RouterGroup) {
	connectionGroup := router.Group("/connection")

	connectionGroup.POST("/", HandleConnectStop)
	connectionGroup.DELETE("/", HandleDeleteConnection)

	connectionGroup.POST("/point", HandleAddConnPoint)
	connectionGroup.DELETE("/point", HandleDeleteConnPoint)
}
