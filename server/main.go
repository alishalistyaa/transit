package main

import (
	"fmt"
	"transit-server/database"
	"transit-server/services/auth"

	"github.com/gin-gonic/gin"
)

func setupRouter() *gin.Engine {
	router := gin.Default()

	v1 := router.Group("/api/v1")
	auth.RouteAuth(v1)

	return router
}

func main() {

	if err := database.ConnectDB(); err != nil {
		fmt.Println("Cannot connect to database")
	} else {
		fmt.Println("Connected to database")
		setupRouter().Run(":5000")
	}
}
