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
import "@theme-toggles/react/css/classic.css"
import { Classic } from "@theme-toggles/react"
 
export function GlobalHeader() {

    const quizState = useQuizState()
    const quizDispatch = useQuizDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const { theme,toggleTheme } = useThemeContext()
    const [isToggled, setToggle] = useState(false)
    console.log(theme)

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

    useEffect(()=>{
        toggleTheme()
    },[isToggled])

  return(
      <StyledGlobalHeaderContainer>
        <StyledGlobalHeaderLeftDiv>
              <StyledGlobalHeaderTitle>
                {getPageTitle(location.pathname)}
              </StyledGlobalHeaderTitle>
        </StyledGlobalHeaderLeftDiv>
        <StyledGlobalHeaderRightDiv>
            <Classic
                style={{color:theme.textColor,fontSize:'2rem'}}
                toggled={isToggled}
                toggle={setToggle}
            />
            <StyledGlobalHeaderButton
                onClick={()=>handleLogout()}
                disabled={quizState.isGameStarted}
            >
                Log Out
            </StyledGlobalHeaderButton>
        </StyledGlobalHeaderRightDiv>
      </StyledGlobalHeaderContainer>
  )

}
