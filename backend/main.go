package main

import (
	"bytes"
	"encoding/json"
	"io"
	"log"
	"net/http"

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

type resetTokenResponse struct {
	ResponseCode    int    `json:"response_code"`
	ResponseMessage string `json:"response_message"`
	Token           string `json:"token"`
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
	token := r.URL.Query().Get("token")
	//values := url.Values{}
	apiUrl := "https://opentdb.com/api.php?"
	if amount != "" {
		apiUrl += "amount=" + amount
		//values.Set("amount", amount)
	}

	if category != "" && category != "randomized categories" && category != "undefined" {
		apiUrl += "&category=" + category
		//values.Set("category", category)
	}

	if difficulty != "" && difficulty != "randomized difficulty" && difficulty != "undefined" {
		apiUrl += "&difficulty=" + difficulty
		//values.Set("difficulty", difficulty)
	}

	if qType != "" && qType != "any type" && qType != "undefined" {
		apiUrl += "&type=" + qType
		//values.Set("type", qType)
	}

	if token != "" {
		apiUrl += "&token=" + token
	}

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
	if apiData.ResponseCode == 4 {
		res, err = http.Get("https://opentdb.com/api_token.php?command=reset&token=" + token)
		if err != nil || res.StatusCode != http.StatusOK {
			http.Error(w, "Failed to reset token", http.StatusInternalServerError)
			return
		}

		var resetToken resetTokenResponse
		decoder := json.NewDecoder(res.Body)
		err = decoder.Decode(&resetToken)

		if err != nil || resetToken.ResponseCode != 0 {
			http.Error(w, "Failed to parse token reset response", http.StatusInternalServerError)
			return
		}

		sessionToken = resetToken.Token
		apiData.NewToken = resetToken.Token
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
