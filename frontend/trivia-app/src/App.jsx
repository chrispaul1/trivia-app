import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import { SettingsPage, QuizPage } from './pages'

function App() {
  const [triviaQuestions,setTriviaQuestions] = useState([])
  const [displayQuestions,setDisplayQuestions] = useState(false)  

  useEffect(()=>{
    if (triviaQuestions.length != []){
      setDisplayQuestions(true)
    }
    console.log("trivia questions in app.jsx",triviaQuestions)
  },[triviaQuestions])

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <SettingsPage
              setTriviaQuestions={setTriviaQuestions}
            />
          }
        />
        <Route
          path="/quiz"
          elemnt={
            <QuizPage
              triviaQuestions={triviaQuestions}
            />
          }
        />
      </Routes>
    </Router>
  )
}

export default App
