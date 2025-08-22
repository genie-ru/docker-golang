package main

import (
	"log"
	"net/http"
)

func main() {
	// ルーティング設定
	setupRoutes()
	
	// サーバー起動
	port := ":1323"
	log.Printf("Server starting on %s", port)
	if err := http.ListenAndServe(port, nil); err != nil {
		log.Fatal(err)
	}
}

// setupRoutes ルーティングの設定
func setupRoutes() {
	// ルートエンドポイント
	http.HandleFunc("/", EnableCORS(HomeHandler))
	
	// APIエンドポイント
	http.HandleFunc("/api/test", EnableCORS(TestAPIHandler))
	http.HandleFunc("/api/hello", EnableCORS(HelloAPIHandler))
	http.HandleFunc("/api/categories", EnableCORS(CategoriesAPIHandler))
}