package main

import "time"

// APITestResponse /api/test のレスポンス構造体
type APITestResponse struct {
	Message string         `json:"message"`
	Status  string         `json:"status"`
	Data    APITestData    `json:"data"`
}

// APITestData /api/test のデータ部分
type APITestData struct {
	Timestamp string `json:"timestamp"`
	Version   string `json:"version"`
}

// HelloResponse /api/hello のレスポンス構造体
type HelloResponse struct {
	Message string `json:"message"`
}

// ErrorResponse エラーレスポンス構造体
type ErrorResponse struct {
	Error   string `json:"error"`
	Message string `json:"message"`
	Code    int    `json:"code"`
}

// Category /api/categories のカテゴリ構造体
type Category struct {
	ID          int       `json:"id"`
	Name        string    `json:"name"`
	Description string    `json:"description"`
	CreatedAt   time.Time `json:"created_at"`
}

