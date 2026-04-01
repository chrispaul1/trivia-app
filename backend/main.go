package main

import (
	"log"
	"net/http"
	"trivia-backend/internal/db"
	"trivia-backend/internal/handlers"

	"github.com/rs/cors"
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
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:5173"},
		AllowedMethods:   []string{"GET", "POST", "OPTIONS"},
		AllowedHeaders:   []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
	})

	//Start the server
	server := &http.Server{
		Addr:    ":5000",
		Handler: c.Handler(mux),
	}
	err := server.ListenAndServe()
	if err != nil {
		log.Fatal(err)
	}
}
