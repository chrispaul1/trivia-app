package handlers

import (
	"encoding/json"
	"net/http"
	"trivia-backend/internal/db"
)

type LeaderboardEntry struct {
	Name              string `json:"name"`
	Score             int    `json:"scores"`
	AnsweredCorrectly int    `json:"answered_correctly"`
	TotalQuestions    int    `json:"totalQuestions"`
	Category          string `json:"category"`
	Difficulty        string `json:"difficulty"`
}

func GetLeaderboard(w http.ResponseWriter, r *http.Request) {

	//query to get the 20 rows with the highest marks
	getScoresQuery := `
		SELECT users.name, scores.score, scores.answered_correctly, scores.total_questions, scores.category, scores.difficulty,
		FROM scores AS A
		JOIN users AS B WHERE A.user_id == B.id
		ORDER BY scores.score DESC 
		LIMIT 10`

	rows, err := db.DB.Query(getScoresQuery)
	if err != nil {
		http.Error(w, "Database error", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	//loops througth the rows and scans the values into struct
	var leaderboard []LeaderboardEntry
	for rows.Next() {
		var i LeaderboardEntry
		err := rows.Scan(&i.Name, &i.Score, &i.AnsweredCorrectly, &i.TotalQuestions, &i.Category, &i.Difficulty)
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
	w.Header().Set("Context-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(leaderboard)

}
