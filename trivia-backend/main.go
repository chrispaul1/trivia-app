package main

import (
	"encoding/json"
	"net/http"
)

type ApiResponse struct {
	ResponseCode int              `json:"response_code"`
	Results      []TriviaQuestion `json:"results"`
}

type TriviaQuestion struct {
	Type            string   `json:"name"`
	Diffculty       string   `json:"diffculty"`
	Category        string   `json:"category"`
	Question        string   `json:"question"`
	CorrectAnswer   string   `json:"correct_answer"`
	IncorrectAnswer []string `json:"incorrect_answers"`
}

func main() {

	mux := http.NewServeMux()
	mux.HandleFunc("GET /getQuestions", getTriviaQuestion)
}

func getTriviaQuestion(w http.ResponseWriter, req *http.Request) {
	apiUrl := "https://opentdb.com/api.php?amount=10"

	res, err := http.Get(apiUrl)
	if err != nil {
		http.Error(w, "Failed to fetch trivia questions", http.StatusInternalServerError)
		return
	}
	defer res.Body.Close()

	var apiData ApiResponse
	decoder := json.NewDecoder(res.Body)
	err = decoder.Decode(&apiData)
	if err != nil {
		http.Error(w, "Failed to parse API response", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(apiData)

}
