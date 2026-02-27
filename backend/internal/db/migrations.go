package db

import (
	"database/sql"
	"log"

	_ "github.com/mattn/go-sqlite3"
)

// Initialize the database schema
func Initialize(db *sql.DB) {
	//Query to create the users and session_tokens tables if they do not exist
	const createTables = `
	CREATE TABLE IF NOT EXISTS users(
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		USERNAME TEXT NOT NULL UNIQUE
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	);
	CREATE TABLE IF NOT EXISTS session_tokens(
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		token TEXT NOT NULL UNIQUE,
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	);`

	_, err := db.Exec(createTables)
	if err != nil {
		log.Fatal("Failed to run migrations:", err)
	}
}
