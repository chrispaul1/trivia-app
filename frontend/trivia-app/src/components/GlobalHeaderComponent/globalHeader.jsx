import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useQuizDispatch, useQuizState } from "../../contexts/quiz/quizContext";
import { useThemeContext } from "../../contexts/theme/themeContext";
import { 
    StyledGlobalHeaderTitle,
    StyledGlobalHeaderButton,
    StyledGlobalHeaderLeftDiv,
    StyledGlobalHeaderRightDiv,
    StyledGlobalHeaderContainer,
 } from "./styles";
import { Classic } from "@theme-toggles/react";
import "@theme-toggles/react/styles/classic.css";
// import { FaCheck } from "react-icons/fa6";
 
export function GlobalHeader() {

    const quizState = useQuizState()
    const quizDispatch = useQuizDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const { theme,toggleTheme } = useThemeContext()
    const isDarkMode = theme.name === 'dark'

    function getPageTitle(path){
        switch(path) {
            case '/':
                return "Main Menu"
            case '/settings':
                return "Quiz Settings"
            case '/quiz':
                return "Trivia Challenge"
            case '/summary':
                return "Quiz Summary"
            default:
                return "Arcade Trivia"
        }
    }

    function handleLogout() {
        quizDispatch({ type: "LOGOUT_USER"})
        quizDispatch({ type: "RESET_GAME" })
        quizDispatch({ type: "END_GAME" })
        navigate('/login',{ replace: true})
    }

  return(
      <StyledGlobalHeaderContainer>
        <StyledGlobalHeaderLeftDiv>
              <StyledGlobalHeaderTitle>
                {getPageTitle(location.pathname)}
              </StyledGlobalHeaderTitle>
        </StyledGlobalHeaderLeftDiv>
        <StyledGlobalHeaderRightDiv>
            <Classic
                style={{
                    background:theme.panel.a2.backgroundColor,
                    color:theme.textColor,
                    fontSize:'1.5rem'}}
                toggled={isDarkMode}
                onClick={()=> toggleTheme()}
            />
            <StyledGlobalHeaderButton
                onClick={()=>handleLogout()}
                disabled={quizState.isGameStarted && location.pathname != '/summary'}
            >
                Log Out
            </StyledGlobalHeaderButton>
        </StyledGlobalHeaderRightDiv>
      </StyledGlobalHeaderContainer>
  )

}
