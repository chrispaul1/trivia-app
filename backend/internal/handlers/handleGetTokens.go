package handlers

import (
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"sync"
	"time"
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

var httpClient = &http.Client{
	Timeout: 15 * time.Second,
}

func FetchTokenSafe() (string, error) {
	tokenUrl := "https://opentdb.com/api_token.php?command=request"

	var resp *http.Response
	var err error
	//log.Printf("Fetching the new token")

	//Try 3 times to contact OpenTDB
	maxRetries := 3
	for i := range maxRetries {
		//log.Printf("tries : %d", i)
		resp, err = httpClient.Get(tokenUrl)

		if err == nil || resp.StatusCode == http.StatusOK {
			break
		}

		if i < maxRetries-1 {
			time.Sleep(5 * time.Second)
		}
	}

	//If we fail return an error msg
	if err != nil || resp.StatusCode != http.StatusOK {
		//log.Printf("error returning")
		return "", fmt.Errorf("Failed to reach OpenTDB after %d attempts: %w", maxRetries, err)
	}

	defer resp.Body.Close()

	//Otherwise decode the msg and return the token
	var tokenResp tokenResponse
	decoder := json.NewDecoder(resp.Body)
	err = decoder.Decode(&tokenResp)

	if err != nil || tokenResp.ResponseCode != 0 {
		return "", errors.New("failed to fetch a valid token")
	}

	//log.Printf("new token returned")
	return tokenResp.Token, nil
}

func FetchToken() (string, error) {
	tokenLock.Lock()
	defer tokenLock.Unlock()
	return FetchTokenSafe()
}

// Resets the token if it has expired after 6 hours
func ResetToken(userID int, token string) error {
	tokenLock.Lock()
	defer tokenLock.Unlock()

	resetUrl := "https://opentdb.com/api_token.php?command=reset&token=" + token
	//log.Printf("reset token url : %s", resetUrl)
	resp, err := http.Get(resetUrl)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	var resetResponse resetTokenResponse
	decoder := json.NewDecoder(resp.Body)
	err = decoder.Decode(&resetResponse)
	//log.Printf("token response : %v", resetResponse)

	var finalToken string

	switch resetResponse.ResponseCode {
	case 0:
		finalToken = resetResponse.Token
	case 3:
		//log.Printf("get new token")
		newToken, err := FetchTokenSafe()

		if err != nil {
			return errors.New("failed to fetch new token")
		}
		//log.Printf("newToke : %s", newToken)

		finalToken = newToken
	default:
		//log.Printf("Err with resetting token : %v", err)
		return fmt.Errorf("OpenTDB returned code %d during rest", resetResponse.ResponseCode)
	}

	//log.Printf("update new token")
	updateTokenQuery := `UPDATE session_tokens SET token = (?) WHERE user_id = (?)`
	_, err = db.DB.Exec(updateTokenQuery, finalToken, userID)
	if err != nil {
		return errors.New("failed to update the session token")
	}

	return nil
}

// Ensure token checks to see if a token currently exists for the user or guest
func EnsureToken(userID int) (string, error) {
	var token string
	//log.Printf("userID : %d", userID)
	query := `SELECT token FROM session_tokens WHERE user_id = (?)`
	err := db.DB.QueryRow(query, userID).Scan(&token)
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
			return newToken, nil
		}
		return "", err
	}

	return token, nil
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
