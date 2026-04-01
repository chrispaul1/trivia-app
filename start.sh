#!/bin/bash
cd frontend/trivia-app && yarn dev &
cd backend && go run main.go &
wait  
