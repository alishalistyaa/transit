package route

import (
	"math"
)

func HaversineDistance(p1, p2 Coordinate) float64 {
	const earthRadius = 6371.0

	lat1 := degToRad(p1.Lat)
	lng1 := degToRad(p1.Lng)
	lat2 := degToRad(p2.Lat)
	lng2 := degToRad(p2.Lng)

	latDiff := lat2 - lat1
	lngDiff := lng2 - lng1
	a := math.Sin(latDiff/2)*math.Sin(latDiff/2) + math.Cos(lat1)*math.Cos(lat2)*math.Sin(lngDiff/2)*math.Sin(lngDiff/2)
	c := 2 * math.Atan2(math.Sqrt(a), math.Sqrt(1-a))

	distance := earthRadius * c

	return distance
}

func degToRad(deg float64) float64 {
	return deg * (math.Pi / 180)
}
