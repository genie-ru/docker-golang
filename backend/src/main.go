package main

import (
	"fmt"
	"log"
	"net/http"
)

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		fmt.Fprint(w, "Hello, world!")
	})
	
	log.Println("Server starting on :1323")
	if err := http.ListenAndServe(":1323", nil); err != nil {
		log.Fatal(err)
	}
}