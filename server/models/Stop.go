package models

type Stop struct {
	StopId  uint `gorm:"primaryKey"`
	Lat     float64
	Lng     float64
	Address string
	Name    string
}
