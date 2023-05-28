package models

type ConnectionPoint struct {
	FirstStopId  uint `gorm:"primaryKey"`
	SecondStopId uint `gorm:"primaryKey"`
}
