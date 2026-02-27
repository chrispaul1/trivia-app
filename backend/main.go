package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"trivia-backend/internal/db"
	"trivia-backend/internal/handlers"

	"github.com/rs/cors"
)

var sessionToken string

type ApiResponse struct {
	ResponseCode int              `json:"response_code"`
	Results      []TriviaQuestion `json:"results"`
	NewToken     string           `json:"new_token,omitempty"`
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

	//Connect to the database and run migrations
	db.Connect("./trivia.db")
	defer db.Close()
	db.Initialize(db.DB)

	//Set up HTTP server and routes
	mux := http.NewServeMux()
	mux.HandleFunc("/get_questions", getTriviaQuestion)
	//mux.HandleFunc("submit_score", handleScoreSubmission)

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

func getTriviaQuestion(w http.ResponseWriter, r *http.Request) {
	category := r.URL.Query().Get("category")
	difficulty := r.URL.Query().Get("difficulty")
	amount := r.URL.Query().Get("amount")
	qType := r.URL.Query().Get("type")
	apiUrl := "https://opentdb.com/api.php?"
	if amount != "" {
		apiUrl += "amount=" + amount
	}

	if category != "" && category != "randomized categories" && category != "undefined" {
		apiUrl += "&category=" + category
	}

	if difficulty != "" && difficulty != "randomized difficulty" && difficulty != "undefined" {
		apiUrl += "&difficulty=" + difficulty
	}

	if qType != "" && qType != "any type" && qType != "undefined" {
		apiUrl += "&type=" + qType
	}

	//Ensure we have a valid token before making the API call
	if err := handlers.EnsureToken(); err != nil {
		http.Error(w, "Failed to validate token: "+err.Error(), http.StatusInternalServerError)
		return
	}

	sessionToken := handlers.GetToken()
	apiUrl += "&token=" + sessionToken

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

	//If the token is invalid or empty, reset it and try again
	if apiData.ResponseCode == 3 || apiData.ResponseCode == 4 {
		if err := handlers.ResetToken(sessionToken); err != nil {
			http.Error(w, "Failed to reset Token: "+err.Error(), http.StatusInternalServerError)
			return
		}

		//Try the API call again with the new token
		sessionToken = handlers.GetToken()
		apiUrl = fmt.Sprintf("https://opentdb.com/api.php?amount=%s&category=%s&difficulty=%s&type=%s&token=%s",
			amount, category, difficulty, qType, sessionToken)

		res, err = http.Get(apiUrl)
		if err != nil || res.StatusCode != http.StatusOK {
			http.Error(w, "Failed to fetch trivia questions", http.StatusInternalServerError)
			return
		}
		defer res.Body.Close()

		decoder = json.NewDecoder(res.Body)
		err = decoder.Decode(&apiData)
		if err != nil || res.StatusCode != http.StatusOK {
			{
				http.Error(w, "Failed to parse API response after token reset", http.StatusInternalServerError)
				return
			}
		}

		//Check if the API call was not successful
		if apiData.ResponseCode != 0 {
			log.Printf("OpenTDB API returned response code %d", apiData.ResponseCode)
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
}
