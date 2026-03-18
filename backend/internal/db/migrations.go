package db

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/mattn/go-sqlite3"
)

// Initialize the database schema
func Initialize() {
	if DB == nil {
		log.Fatal("Failed to initialize database: DB connection is nil")
	}

	//Query to create the users and session_tokens tables if they do not exist
	const createTables = `
	CREATE TABLE IF NOT EXISTS users(
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		name TEXT NOT NULL UNIQUE,
		is_guest BOOLEAN DEFAULT 0,
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	);
	CREATE TABLE IF NOT EXISTS session_tokens(
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		token TEXT NOT NULL UNIQUE,
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		user_id INTEGER,
		CONSTRAINT fk_users,
		FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE

	);
	CREATE TABLE IF NOT EXISTS scores(
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		user_id TEXT NOT NULL,
		score INTEGER NOT NULL,
		answered_correctly INTEGER NOT NULL,
		total_questions INTEGER NOT NULL,
		category TEXT,
		difficulty TEXT,
		completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		CONSTRAINT fk_users
		FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
	);
	`

	const ClearOldGuests = `
		DELETE FROM users WHERE is_guest = 1 AND created_at <= DATETIME('NOW',"-1 days");
	`

	_, err := DB.Exec(createTables)
	if err != nil {
		log.Fatal("Failed to run migrations:", err)
	}

	_, err = DB.Exec(ClearOldGuests)
	if err != nil {
		log.Printf("Failed to clear old guests: %v\n", err)
	}
}

// Adds or Fetches a user from the table
func AddOrFetchUser(name string, isGuest bool) (int, error) {
	var userID int
	err := DB.QueryRow("SELECT id FROM users WHERE name = (?)", name).Scan(&userID)
	if err == sql.ErrNoRows {
		res, err := DB.Exec("INSERT INTO users (name,is_guest) values (?,?)", name, isGuest)
		if err != nil {
			return 0, err
		}
		id, err := res.LastInsertId()
		if err != nil {
			return 0, err
		}
		userID = int(id)
		//log.Printf("\n** new user id : %d", userID)
	} else if err != nil {
		return 0, err
	}
	//log.Printf("Successfully added or fetched the user")
	return userID, nil
}

// Add a score record to the scores table
func AddScore(userID int, score int, answeredCorrectly int, totalQuestions int, category string, difficulty string) error {
	if DB == nil {
		return fmt.Errorf("Failed to add score, DB connection is nil")
	}

	insertScoreQuery := `INSERT INTO scores(user_id,score,answered_correctly,total_questions,category,difficulty) 
					VALUES (?,?,?,?,?,?)`

	_, err := DB.Exec(insertScoreQuery, userID, score, answeredCorrectly, totalQuestions, category, difficulty)
	if err != nil {
		return fmt.Errorf("Failed to add score into database: %w", err)
	}

	return nil
}
