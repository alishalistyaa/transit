package database

import (
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDB() error {
	var err error

	dsn := "host=localhost user=rma1403 password=299792458 dbname=transit port=5432 sslmode=disable"
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})

	return err
}
