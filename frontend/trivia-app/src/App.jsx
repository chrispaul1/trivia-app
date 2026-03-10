import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import { SettingsPage, QuizPage, LoginPage } from './pages'
//import {QuizPage}  from "./pages"

function App() {

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <LoginPage/>
          }
        />

        <Route
          path="/settings"
          element={
            <SettingsPage/>
          }
        />
        <Route
          path="/quiz"
          element={
            <QuizPage/>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
