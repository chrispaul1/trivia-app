package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"
	"trivia-backend/internal/db"
)

type LoginRequest struct {
	Name    string `json:"username"`
	IsGuest bool   `json:"isGuest"`
}

type LoginResponse struct {
	ID   int    `json:"id"`
	Name string `json:"username"`
}

func HandleLogin(w http.ResponseWriter, r *http.Request) {

	//Decodes the request
	var request LoginRequest
	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		http.Error(w, "Invalid Request", http.StatusBadRequest)
		return
	}
	defer r.Body.Close()

	//Checks to see if the user is a guest, generates the guest username
	if request.Name == "Guest" {
		request.Name = GenerateGuestUserName()
	}
	//log.Printf("**user name : %s", request.Name)

	//Adds or fetches the user if they exist in the users table
	userID, err := db.AddOrFetchUser(request.Name, request.IsGuest)
	if err != nil {
		http.Error(w, "Failed to Create or Fetch the user", http.StatusInternalServerError)
		return
	}

	//log.Printf("Successfully added or fetched user")
	//creates and returns the login response
	response := LoginResponse{ID: userID, Name: request.Name}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)

}

func GenerateGuestUserName() string {
	timeStamp := time.Now().UnixMilli()

	return fmt.Sprintf("guest_%d", timeStamp)
}
