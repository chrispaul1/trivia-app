package main

import (
	"log"
	"net/http"
	"trivia-backend/internal/db"
	"trivia-backend/internal/handlers"
)

func main() {

	//Connect to the database and run migrations
	db.Connect("./trivia.db")
	//defer db.Close()
	db.Initialize()

	//Set up HTTP server and routes
	mux := http.NewServeMux()
	mux.HandleFunc("GET /questions", handlers.HandleQuestion)
	mux.HandleFunc("POST /login", handlers.HandleLogin)
	mux.HandleFunc("POST /score", handlers.HandleScoring)
	mux.HandleFunc("GET /leaderboard", handlers.GetLeaderboard)

	//Configure CORS
	handlerWithCORS := enableCors(mux)

	//Start the server
	server := &http.Server{
		Addr:    ":5000",
		Handler: handlerWithCORS,
	}
	err := server.ListenAndServe()
	if err != nil {
		log.Fatal("Server failed to start", err)
	}
}

func enableCors(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		w.Header().Set("Access-Control-Allow-Origin", "*")

		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")

		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})

}
