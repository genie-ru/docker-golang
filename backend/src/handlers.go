package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"
)

// HomeHandler ルートエンドポイント
func HomeHandler(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
	fmt.Fprint(w, "Hello, world!")
}

// TestAPIHandler /api/test エンドポイント
func TestAPIHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	
	response := APITestResponse{
		Message: "API is working!",
		Status:  "success",
		Data: APITestData{
			Timestamp: time.Now().Format("2006-01-02"),
			Version:   "1.0.0",
		},
	}
	
	json.NewEncoder(w).Encode(response)
}

// HelloAPIHandler /api/hello エンドポイント
func HelloAPIHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	
	name := r.URL.Query().Get("name")
	if name == "" {
		name = "World"
	}
	
	response := HelloResponse{
		Message: fmt.Sprintf("Hello %s", name),
	}
	
	json.NewEncoder(w).Encode(response)
}

// CategoriesAPIHandler /api/categories エンドポイント
func CategoriesAPIHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	
	// サンプルカテゴリデータ
	categories := []Category{
		{ID: 1, Name: "Technology", Description: "Tech related topics", CreatedAt: time.Now()},
		{ID: 2, Name: "Sports", Description: "Sports and fitness", CreatedAt: time.Now()},
		{ID: 3, Name: "Music", Description: "Music and entertainment", CreatedAt: time.Now()},
		{ID: 4, Name: "Education", Description: "Educational content", CreatedAt: time.Now()},
		{ID: 5, Name: "Business", Description: "Business and finance", CreatedAt: time.Now()},
	}
	
	json.NewEncoder(w).Encode(categories)
}

