package auth

import (
	"fmt"
	"os"
	"strconv"
	"strings"
	"time"

	jwt "github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
)

func GenerateToken(email string) (string, error) {
	tokenLifespan, err := strconv.Atoi(os.Getenv("TOKEN_HOUR_LIFESPAN"))

	if err != nil {
		return "", err
	}

	claims := jwt.MapClaims{}
	claims["authorized"] = true
	claims["email"] = email
	claims["exp"] = time.Now().Add(time.Hour * time.Duration(tokenLifespan)).Unix()

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(os.Getenv("JWT_SECRET")))
}

func ExtractToken(context *gin.Context) (string, error) {
	authHeader := context.Request.Header.Get("Authorization")
	if len(strings.Split(authHeader, " ")) != 2 {
		return "", fmt.Errorf("invalid authorization header: %v", authHeader)
	}

	tokenString := strings.Split(authHeader, " ")[1]
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return "", fmt.Errorf("invalid signing method: %v", token.Header["alg"])
		}

		return []byte(os.Getenv("JWT_SECRET")), nil
	})

	if err != nil {
		return "", err
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if ok && token.Valid {
		return fmt.Sprint(claims["email"]), nil
	}

	return "", fmt.Errorf("invalid jwt token")
}
