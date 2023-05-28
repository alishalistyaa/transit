package models

import (
	"transit-server/database"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type User struct {
	UserId   uint `gorm:"primaryKey"`
	Email    string
	Name     string
	Password string
	Address  string
	Phone    string
	Age      uint
}

func (user *User) SaveUser() (*User, error) {
	err := database.DB.Create(&user).Error

	if err != nil {
		return &User{}, err
	}

	return user, nil
}

// GORM Hook
func (user *User) BeforeSave(tx *gorm.DB) error {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)

	if err != nil {
		return err
	}

	user.Password = string(hashedPassword)
	return nil
}
