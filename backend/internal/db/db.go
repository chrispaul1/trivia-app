package db

import (
	"database/sql"
	"log"

	_ "modernc.org/sqlite"
)

var DB *sql.DB

func Connect(dbFile string) *sql.DB {
	var err error
	DB, err = sql.Open("sqlite", dbFile)
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	// 🪄 WAKE UP THE CASCADE MAGIC!
	_, err = DB.Exec("PRAGMA foreign_keys = ON;")
	if err != nil {
		log.Fatal("Failed to enable foreign keys:", err)
	}
	log.Println("Database connected successfully.")
	return DB
}

func Close() {
	if DB != nil {
		DB.Close()
	}
}
