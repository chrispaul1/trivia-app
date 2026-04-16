package handlers

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"time"
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

	var apiData ApiResponse

	//Get the params value
	amount := r.URL.Query().Get("amount")
	category := r.URL.Query().Get("category")
	difficulty := r.URL.Query().Get("difficulty")
	qType := r.URL.Query().Get("type")
	id := r.URL.Query().Get("userid")
	userID, err := strconv.Atoi(id)
	if err != nil {
		fmt.Printf("Error during conversion: %v\n", err)
		return
	}

	//Ensure we have a valid token before making the API call
	sessionToken, err := EnsureToken(userID)
	if err != nil {
		http.Error(w, "Failed to validate token: "+err.Error(), http.StatusInternalServerError)
		return
	}

	//helper func to build the url dynamically
	buildOpenTDBUrl := func(currentAmount string) string {
		url := fmt.Sprintf("https://opentdb.com/api.php?amount=%s", currentAmount)

		if category != "" && category != "randomized categories" && category != "undefined" {
			url += fmt.Sprintf("&category=%s", category)
		}

		if difficulty != "" && difficulty != "randomized difficulty" && difficulty != "undefined" {
			url += fmt.Sprintf("&difficulty=%s", difficulty)
		}

		if qType != "" && qType != "any type" && qType != "undefined" {
			url += fmt.Sprintf("&type=%s", qType)
		}

		url += fmt.Sprintf("&token=%s", sessionToken)
		return url
	}

	//waterfall method to call the OpenTDB database if we are requesting too many questions
	//based on the parameters
	currentAmountStr := amount

	for {
		//Fetch trivia questions from OpenTDB API
		apiUrl := buildOpenTDBUrl(currentAmountStr)
		res, err := http.Get(apiUrl)
		if err != nil {
			http.Error(w, "Failed to fetch trivia questions", http.StatusInternalServerError)
			return
		}

		defer res.Body.Close()
		//log.Printf("Error code : %d", res.StatusCode)
		if res.StatusCode != http.StatusOK {
			http.Error(w, "Error fetching questions from OpenTDB", http.StatusBadGateway)
			return
		}

		//Decode the response
		decoder := json.NewDecoder(res.Body)
		err = decoder.Decode(&apiData)
		if err != nil {
			http.Error(w, "Failed to parse API response", http.StatusInternalServerError)
			return
		}

		//log.Printf("api response code : %d", apiData.ResponseCode)
		//We got the questions without any error
		if apiData.ResponseCode == 0 {
			break
		}

		//If there are fewer questions than what was requested, retry with less questions
		if apiData.ResponseCode == 1 {
			log.Println("calling from the waterfall")
			amountInt, _ := strconv.Atoi(currentAmountStr)

			if amountInt > 40 {
				currentAmountStr = "40"
			} else if amountInt > 30 {
				currentAmountStr = "30"
			} else if amountInt > 20 {
				currentAmountStr = "20"
			} else if amountInt > 10 {
				currentAmountStr = "10"
			} else {
				break
			}

			time.Sleep(5 * time.Second)
			continue
		}

		if apiData.ResponseCode == 2 {
			http.Error(w, "Invalid Parameter passed in", http.StatusBadGateway)
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

			apiUrl = buildOpenTDBUrl(currentAmountStr)

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
	}

	//Check if the API call was not successful
	if apiData.ResponseCode != 0 && apiData.ResponseCode != 1 {
		log.Printf("OpenTDB API returned response code %d", apiData.ResponseCode)
		http.Error(w, "OpenTDB returned an error", http.StatusBadGateway)
		return
	}

	//Return an empty array, if there are no more questions left
	if len(apiData.Results) == 0 {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(apiData)
		return
	}

	//Return the questions
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(apiData)

}
