package main

import (
	"fmt"
	"os"
	"transit-server/database"
	"transit-server/services/auth"
	"transit-server/services/connection"
	"transit-server/services/route"
	"transit-server/services/stop"
	"transit-server/services/user"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func setupRouter() *gin.Engine {
	router := gin.Default()

	corsConfig := cors.DefaultConfig()
	corsConfig.AllowOrigins = []string{"*"}
	corsConfig.AllowHeaders = []string{"Authorization", "content-type"}

	router.Use(cors.New(corsConfig))

	v1 := router.Group("/api/v1")

	auth.RouteAuth(v1)
	stop.RouteStop(v1)
	connection.RouteConnection(v1)
	route.RouteRoutes(v1)
	user.RouteUser(v1)

	return router
}

func main() {
	if err := database.ConnectDB(); err != nil {
		fmt.Println("Database connection failed: ", err.Error())
	} else {
		setupRouter().Run(":" + os.Getenv("PORT"))
	}
}
