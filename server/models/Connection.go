package models

type Connection struct {
	FirstStopId  uint `gorm:"primaryKey"`
	SecondStopId uint `gorm:"primaryKey"`
}
