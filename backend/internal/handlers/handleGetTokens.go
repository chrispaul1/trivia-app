package handlers

import (
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"
	"os"
	"sync"
	"trivia-backend/internal/db"
)

var sessionToken string
var tokenLock sync.Mutex

type tokenResponse struct {
	ResponseCode    int    `json:"response_code"`
	ResponseMessage string `json:"response_message"`
	Token           string `json:"token"`
}

type resetTokenResponse struct {
	ResponseCode int    `json:"response_code"`
	Token        string `json:"token"`
}

func FetchToken() (string, error) {
	tokenLock.Lock()
	defer tokenLock.Unlock()
	tokenUrl := "https://opentdb.com/api_token.php?command=request"
	resp, err := http.Get(tokenUrl)

	if err != nil || resp.StatusCode != http.StatusOK {
		return "", err
	}
	defer resp.Body.Close()

	var tokenResp tokenResponse
	decoder := json.NewDecoder(resp.Body)
	err = decoder.Decode(&tokenResp)
	if err != nil || tokenResp.ResponseCode != 0 {
		return "", errors.New("failed to fetch a valid token")
	}
	return tokenResp.Token, nil
}

func ResetToken(userID int, token string) error {
	tokenLock.Lock()
	defer tokenLock.Unlock()

	resetUrl := "https://opentdb.com/api_token.php?command=reset&token=" + token
	resp, err := http.Get(resetUrl)
	if err != nil {
		return err
	}
	defer resp.Body.Close()
	log.Printf("^^^token reset suscessfully")
	var resetResp resetTokenResponse
	decoder := json.NewDecoder(resp.Body)
	err = decoder.Decode(&resetResp)
	if err != nil || resetResp.ResponseCode != 0 {
		return errors.New("failed to reset token")
	}
	sessionToken = resetResp.Token
	updateTokenQuery := `UPDATE session_tokens SET token = (?) WHERE user_id = (?)`
	_, err = db.DB.Exec(updateTokenQuery, resetResp.Token, userID)
	if err != nil {
		return errors.New("failed to update the session token")
	}

	return nil
}

// Ensure token checks to see if a token currently exists for the user or guest
func EnsureToken(userID int) (string, error) {
	var token string

	query := `SELECT token FROM session_tokens WHERE user_id = (?)`
	err := db.DB.QueryRow(query, userID).Scan(&token)
	log.Printf("query token : %s", token)
	fmt.Fprintf(os.Stderr, "Error: %v\n", err)
	if err != nil {
		if err == sql.ErrNoRows {
			newToken, fetchErr := FetchToken()
			if fetchErr != nil {
				return "", fetchErr
			}
			insertQuery := `INSERT INTO session_tokens(user_id,token) VALUES (?,?)`
			_, insertErr := db.DB.Exec(insertQuery, userID, newToken)
			if insertErr != nil {
				return "", insertErr
			}
			log.Printf("New Token added")
			return newToken, nil
		}
		return "", err
	}

	return token, nil

	// if sessionToken == "" {
	// 	newToken, err := FetchToken()
	// 	if err != nil {
	// 		return err
	// 	}
	// 	sessionToken = newToken
	// }
	// return nil
}

// Retrieve the Token from the back
func GetToken(userID int) (string, error) {
	tokenLock.Lock()
	defer tokenLock.Unlock()

	var userToken string
	getTokenQuery := `SELECT token FROM session_tokens WHERE user_id = (?)`
	err := db.DB.QueryRow(getTokenQuery, userID).Scan(&userToken)
	if err != nil {
		return "", err
	}
	return userToken, nil
}
