import React, { useEffect, useState } from "react";
import {
  StyledButton,
  StyledLoginDiv,
  StyledLoginInput,
  StyledUserNameDiv,
  StyledLoginBackground,
  StyledLoginInputContainer,
} from ".";
import { useNavigate } from "react-router-dom";
import { useQuizState, useQuizDispatch } from "../context/quizContext";

export function LoginPage() {

  const [username, setUsername] = useState("")
  const [showMenu, setShowMenu] = useState(false)
  const navigate = useNavigate()
  const quizState = useQuizState()
  const quizDispatch = useQuizDispatch()
  const userAmt = quizState.settingsState.amount


  //Function to handle login, will eventually send username to backend and receive a token, for now it just navigates to the settings page
  async function handleLogin(isGuest = false) {
    try{
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: isGuest ? "Guest" : username })
      })
      const userData = await response.json()
      console.log("userData :",userData)
      quizDispatch({
        type:'SET_USER_DATA',
        payload: {id:userData.id,name:userData.name}
      })
      setShowMenu(true)
    } catch (error){
      console.error('error',error)
    }
  }

	//call to the backend to ge the questions with the default settings
	function handleStartQuiz(){  
    navigate("/quiz")
	}

  
  return (
    <StyledLoginBackground>
      <StyledLoginDiv>
        <h2>Trivia Quiz Application</h2>
        {!showMenu ?
          <StyledLoginInputContainer>
            <StyledUserNameDiv>
              <StyledLoginInput
                type="text"
                id="username"
                placeholder="Enter your Username"
                onChange={(e) => setUsername(e.target.value)}
              />
              <StyledButton
                onClick={() => handleLogin(false)}
              >
                Enter
              </StyledButton>
            </StyledUserNameDiv>
            <StyledButton
              onClick={() => handleLogin(true) }
            >
              Play as Guest
            </StyledButton>
            <StyledButton
            >
              View Leaderboard
            </StyledButton>
          </StyledLoginInputContainer>
          :
          <StyledLoginInputContainer>

            <StyledButton
							onClick={(e)=>handleStartQuiz()}
            >
              Start Quiz
            </StyledButton>

            <StyledButton
							onClick={(e)=>navigate("/settings")}
            >
              Customize Quiz Settings
            </StyledButton>
          </StyledLoginInputContainer>
        }
      </StyledLoginDiv>
    </StyledLoginBackground>
  )
}