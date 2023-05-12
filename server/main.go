package main

import (
	"transit-server/services/auth"

	"github.com/gin-gonic/gin"
)

func setupRouter() *gin.Engine {
	router := gin.Default()
	auth.RouteAuth(router)

	return router
}

func main() {
	setupRouter().Run(":5000")
}
