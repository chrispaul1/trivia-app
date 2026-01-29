package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"net/url"

	"github.com/rs/cors"
)

type ApiResponse struct {
	ResponseCode int              `json:"response_code"`
	Results      []TriviaQuestion `json:"results"`
}

type TriviaQuestion struct {
	Type            string   `json:"type"`
	Difficulty      string   `json:"difficulty"`
	Category        string   `json:"category"`
	Question        string   `json:"question"`
	CorrectAnswer   string   `json:"correct_answer"`
	IncorrectAnswer []string `json:"incorrect_answers"`
}

func main() {

	mux := http.NewServeMux()
	mux.HandleFunc("/get_questions", getTriviaQuestion)

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:5173"},
		AllowedMethods:   []string{"GET", "POST", "OPTIONS"},
		AllowedHeaders:   []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
	})
	server := &http.Server{
		Addr:    ":5000",
		Handler: c.Handler(mux),
	}

	err := server.ListenAndServe()
	if err != nil {
		log.Fatal(err)
	}
}

func getTriviaQuestion(w http.ResponseWriter, r *http.Request) {
	category := r.URL.Query().Get("category")
	difficulty := r.URL.Query().Get("difficulty")
	amount := r.URL.Query().Get("amount")
	qType := r.URL.Query().Get("type")
	values := url.Values{}
	apiUrl := "https://opentdb.com/api.php?"
	if amount != "" {
		apiUrl += "amount=" + amount
		values.Set("amount", amount)
	}

	if category != "" && category != "randomized categories" && category != "undefined" {
		apiUrl += "&category=" + category
		values.Set("category", category)
	}

	if difficulty != "" && difficulty != "randomized difficulty" && difficulty != "undefined" {
		apiUrl += "&difficulty=" + difficulty
		values.Set("difficulty", difficulty)
	}

	if qType != "" && qType != "any type" && qType != "undefined" {
		apiUrl += "&type=" + qType
		values.Set("type", qType)
	}
	fmt.Print("Final API URL: ", apiUrl)
	//apiUrl := "https://opentdb.com/api.php?" + values.Encode()
	//Fetch trivia questions from OpenTDB API
	res, err := http.Get(apiUrl)
	if err != nil {
		http.Error(w, "Failed to fetch trivia questions", http.StatusInternalServerError)
		return
	}

	defer res.Body.Close()

	if res.StatusCode != http.StatusOK {
		http.Error(w, "Error fetching questions from OpenTDB", http.StatusBadGateway)
		return
	}

	body, _ := io.ReadAll(res.Body)
	res.Body = io.NopCloser(bytes.NewBuffer(body))

	//Decode the response
	var apiData ApiResponse
	decoder := json.NewDecoder(res.Body)
	err = decoder.Decode(&apiData)
	if err != nil {
		http.Error(w, "Failed to parse API response", http.StatusInternalServerError)
		return
	}

	if apiData.ResponseCode != 0 {
		http.Error(w, "OpenTDB returned an error", http.StatusBadGateway)
		return
	}

	if len(apiData.Results) == 0 {
		http.Error(w, "No questions avaliable", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(apiData)
}
