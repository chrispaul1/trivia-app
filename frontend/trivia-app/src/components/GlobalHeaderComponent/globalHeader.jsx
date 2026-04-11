import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useQuizDispatch, useQuizState } from "../../contexts/quiz/quizContext";
import { 
    StyledGlobalHeader,
    StyledGlobalHeaderButton,
    StyledGlobalHeaderLeftDiv,
    StyledGlobalHeaderRightDiv,
    StyledGlobalHeaderContainer,
 } from "./styles";

export function GlobalHeader() {

    const quizState = useQuizState()
    const quizDispatch = useQuizDispatch()
    const navigate = useNavigate()
    const location = useLocation()

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
            <StyledGlobalHeader>
                {getPageTitle(location.pathname)}
            </StyledGlobalHeader>
        </StyledGlobalHeaderLeftDiv>
        <StyledGlobalHeaderRightDiv>
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
