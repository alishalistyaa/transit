package main

import (
	"fmt"
	"transit-server/database"
	"transit-server/services/auth"
	"transit-server/services/connection"
	"transit-server/services/route"
	"transit-server/services/stop"

	"github.com/gin-gonic/gin"
)

func setupRouter() *gin.Engine {
	router := gin.Default()

	v1 := router.Group("/api/v1")

	auth.RouteAuth(v1)
	stop.RouteStop(v1)
	connection.RouteConnection(v1)
	route.RouteRoutes(v1)

	return router
}

func main() {
	if err := database.ConnectDB(); err != nil {
		fmt.Println("Database connection failed: ", err.Error())
	} else {
		setupRouter().Run(":5000")
	}
}
