package handlers

import (
	"encoding/json"
	"log"
	"net/http"
	"trivia-backend/internal/db"
)

type ScoreStruct struct {
	UserID            int    `json:"userID"`
	Score             int    `json:"score"`
	AnsweredCorrectly int    `json:"answeredCorrectly"`
	TotalQuestions    int    `json:"totalQuestions"`
	Category          string `json:"category"`
	Difficulty        string `json:"difficulty"`
}

func HandleScoring(w http.ResponseWriter, r *http.Request) {
	log.Printf("Add a score to the database")
	//Decode the socre struct sent to be submitted into the database
	var scoreRequest ScoreStruct
	if err := json.NewDecoder(r.Body).Decode(&scoreRequest); err != nil {
		http.Error(w, "Invalid Request", http.StatusBadRequest)
		return
	}
	defer r.Body.Close()

	//Call the func to add the score into the database
	err := db.AddScore(
		scoreRequest.UserID,
		scoreRequest.Score,
		scoreRequest.AnsweredCorrectly,
		scoreRequest.TotalQuestions,
		scoreRequest.Category,
		scoreRequest.Difficulty)
	if err != nil {
		http.Error(w, "Failed to add the score", http.StatusInternalServerError)
		return
	}
	log.Printf("Added the score to the database")
	w.WriteHeader(http.StatusCreated)
}
