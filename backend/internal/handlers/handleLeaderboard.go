package handlers

import (
	"encoding/json"
	"net/http"
	"trivia-backend/internal/db"
)

type leaderboardUsername struct {
}

type LeaderboardEntry struct {
	Name              string `json:"name"`
	Score             int    `json:"scores"`
	AnsweredCorrectly int    `json:"answered_correctly"`
	TotalQuestions    int    `json:"totalQuestions"`
	Category          string `json:"category"`
	Difficulty        string `json:"difficulty"`
	Mode              string `json:"mode"`
}

func GetLeaderboard(w http.ResponseWriter, r *http.Request) {
	username := r.URL.Query().Get("username")
	category := r.URL.Query().Get("category")
	difficulty := r.URL.Query().Get("difficulty")

	var query string
	var args []interface{}

	if username != "" {
		query = `
		SELECT users.name, scores.score, scores.answered_correctly, scores.total_questions, scores.category, scores.difficulty, scores.mode
		FROM scores
		JOIN users ON scores.user_id == users.id
		WHERE users.name = ?
		`
		args = append(args, username)
	} else {
		//query to get the 10 rows with the highest marks
		query = `
		SELECT users.name, scores.score, scores.answered_correctly, scores.total_questions, scores.category, scores.difficulty, scores.mode
		FROM scores
		JOIN users ON scores.user_id == users.id 
		WHERE users.is_guest = 0
		`
	}

	if category != "" {
		query += " AND scores.category = ?"
		args = append(args, category)
	}

	if difficulty != "" {
		query += " AND scores.difficulty = ?"
		args = append(args, difficulty)
	}

	query += " ORDER BY scores.score DESC LIMIT 10;"

	rows, err := db.DB.Query(query, args...)
	if err != nil {
		http.Error(w, "Database error", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	//loops througth the rows and scans the values into struct
	var leaderboard []LeaderboardEntry
	for rows.Next() {
		var i LeaderboardEntry
		err := rows.Scan(&i.Name, &i.Score, &i.AnsweredCorrectly, &i.TotalQuestions, &i.Category, &i.Difficulty, &i.Mode)
		if err != nil {
			http.Error(w, "Database error", http.StatusInternalServerError)
			return
		}
		leaderboard = append(leaderboard, i)
	}

	if err = rows.Err(); err != nil {
		http.Error(w, "Database error", http.StatusInternalServerError)
		return
	}
	//sets the content header and Marshal the struct into JSON bytes and write to the ResponseWriter
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(leaderboard)
}
