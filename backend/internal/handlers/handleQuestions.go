package handlers

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"
)

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

func HandleQuestion(w http.ResponseWriter, r *http.Request) {

	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	category := r.URL.Query().Get("category")
	difficulty := r.URL.Query().Get("difficulty")
	amount := r.URL.Query().Get("amount")
	qType := r.URL.Query().Get("type")
	id := r.URL.Query().Get("userid")

	userID, err := strconv.Atoi(id)
	if err != nil {
		fmt.Printf("Error during conversion: %v\n", err)
		return
	}
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
	sessionToken, err := EnsureToken(userID)
	if err != nil {
		http.Error(w, "Failed to validate token: "+err.Error(), http.StatusInternalServerError)
		return
	}

	apiUrl += "&token=" + sessionToken
	log.Printf("apiUrl : %s", apiUrl)

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
		log.Println("Token expired or empty, resetting...")
		if err := ResetToken(userID, sessionToken); err != nil {
			http.Error(w, "Failed to reset Token: "+err.Error(), http.StatusInternalServerError)
			return
		}

		//Try the API call again with the new token
		sessionToken, err = GetToken(userID)
		if err != nil {
			http.Error(w, "Failed to get token : "+err.Error(), http.StatusInternalServerError)
			return
		}

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

	log.Printf("Successfully retrieved the questions")
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(apiData)
}
