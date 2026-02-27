import (
	"net/http"
	"log"
	"encoding/json"
	"trivia-backend/internal/db"
)

type LoginRequest struct {
	Username string `json:"username"`
}

type LoginResponse struct {
	ID       int    `json:"id"`
	Username string `json:"username"`
}

func HandleLogin(w http.ResponseWriter, r *http.Request) {

}

func AddOrFetchUser(username string) (LoginResponse, error) {
	var response LoginResponse
}