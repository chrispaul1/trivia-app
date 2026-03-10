import React, { useEffect, useState } from "react";
import {
  StyledButton,
  StyledLoginDiv,
  StyledLoginInput,
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
  const userAmt = quizState.initialAnswerState.amount

  //Function to handle login, will eventually send username to backend and receive a token, for now it just navigates to the settings page
  async function handleLogin(isGuest = false) {
    try{
      const payload = {username : isGuest ? "Guest" : username}
      console.log("SENDING THIS  PAYLOAD",JSON.stringify(payload))
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

  useEffect(()=>{
    console.log("user id",quizState.userID)
  },[quizState])

	//call to the backend to ge the questions with the default settings
	async function handleStartQuiz(){    
    console.log("******user id", quizState.userID)
    const apiUrl = `http://localhost:5000/get_questions?amount=${userAmt}&userid=${quizState.userID}`
    try{
      const res = await fetch(apiUrl)
      if (!res.ok){
        throw new Error("Error, Failed to fetch trivia questions")
      }

      const data = await res.json()
      console.log("data",data)
      navigate("/quiz",{state:{triviaQuestions: data.results}})
    } catch(error){
      console.log("Error, Failed to fetch trivia questions ",error)
    }
	}

  
  return (
    <StyledLoginBackground>
      <StyledLoginDiv>
        <h2>Trivia Quiz Application</h2>
        {!showMenu ?
          <StyledLoginInputContainer>
            <div>
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
            </div>
            <StyledButton
              onClick={() => handleLogin(true) }
            >
              Play as Guest
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