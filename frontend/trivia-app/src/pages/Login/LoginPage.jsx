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
import { useQuizState, useQuizDispatch } from "../../contexts/quiz/quizContext";
import { useThemeContext } from "../../contexts/theme/themeContext";

export function LoginPage() {

  const [username, setUsername] = useState("")
  const navigate = useNavigate()
  const quizState = useQuizState()
  const quizDispatch = useQuizDispatch()
  const {theme,toggleTheme}  = useThemeContext()

  console.log("Current Theme State:", theme);

  useEffect(()=>{
    if(quizState.isLoggedIn){
      navigate("/",{replace:true})
    }
  },[])

  //Function to handle login, will eventually send username to backend and receive a token, for now it just navigates to the settings page
  async function handleLogin(isGuest = false) {
    try{
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          username: isGuest ? "Guest" : username,
          isGuest: isGuest
        })
      })
      const userData = await response.json()
      // quizDispatch({
      //   type:'SET_USER_DATA',
      //   payload: {id:userData.id,name:userData.username}
      // })
      quizDispatch({ type: 'LOGIN_USER', payload: { id: userData.id, name: userData.username } })
      navigate("/",{replace:true})
    } catch (error){
      console.error('error',error)
    }
  }

  return (
    <StyledLoginBackground>
      <StyledLoginDiv
        style={theme.panel.a5}
      >
        <h2>Login</h2>
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
            onClick={() => handleLogin(true)}
          >
            Play as Guest
          </StyledButton>

        </StyledLoginInputContainer>
      </StyledLoginDiv>
    </StyledLoginBackground>
  )
}