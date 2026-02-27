package db

import (
	"database/sql"
	"log"

	_ "github.com/mattn/go-sqlite3"
)

var DB *sql.DB

func Connect(dbFile string) *sql.DB {
	var err error
	DB, err := sql.Open("sqlite3", dbFile)
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}
	return DB
}

func Close() {
	if DB != nil {
		DB.Close()
	}
}
