package handlers

import (
	"encoding/json"
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
	Mode              string `json:"mode"`
}

func HandleScoring(w http.ResponseWriter, r *http.Request) {

	// // 1. Read the raw bytes from the request body
	// bodyBytes, err := io.ReadAll(r.Body)
	// if err != nil {
	// 	http.Error(w, "Failed to read body", http.StatusInternalServerError)
	// 	return
	// }

	// // 2. Print the raw string to your Go terminal!
	// fmt.Println("RECEIVED BODY:", string(bodyBytes))

	// // 3. PUT THE BYTES BACK so the JSON decoder can read them!
	// r.Body = io.NopCloser(bytes.NewBuffer(bodyBytes))

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
		scoreRequest.Difficulty,
		scoreRequest.Mode)
	if err != nil {
		http.Error(w, "Failed to add the score", http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusCreated)
}
