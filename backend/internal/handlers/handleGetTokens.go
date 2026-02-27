package handlers

import (
	"encoding/json"
	"errors"
	"net/http"
	"sync"
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

func ResetToken(token string) error {
	tokenLock.Lock()
	defer tokenLock.Unlock()

	resetUrl := "https://opentdb.com/api_token.php?command=reset&token=" + token
	resp, err := http.Get(resetUrl)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	var resetResp resetTokenResponse
	decoder := json.NewDecoder(resp.Body)
	err = decoder.Decode(&resetResp)
	if err != nil || resetResp.ResponseCode != 0 {
		return errors.New("failed to reset token")
	}
	sessionToken = resetResp.Token
	return nil
}

func EnsureToken() error {
	tokenLock.Lock()
	defer tokenLock.Unlock()

	if sessionToken == "" {
		newToken, err := FetchToken()
		if err != nil {
			return err
		}
		sessionToken = newToken
	}
	return nil
}

func GetToken() string {
	tokenLock.Lock()
	defer tokenLock.Unlock()
	return sessionToken
}
