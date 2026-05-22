import React from "react";
import { StyledErrorBackground } from ".";
import { useQuizState, useQuizDispatch } from "../../contexts/quiz/quizContext";
import { ErrorBoundary, getErrorMessage } from "react-error-boundary";

export function ErrorFallback({error, resetErrorBoundary}) {

    const quizState = useQuizState()

    function handleBackToMenu(){
        if(quizState.isLoggedIn){
            window.location.assign("/");        
        } else {
            window.location.assign("/login");        
        }
        resetErrorBoundary()
    }

    return (
        <StyledErrorBackground>
            <h2>
                Sorry! Something went wrong
            </h2>
            <pre>
                {getErrorMessage(error)}
            </pre>
            <P>
                Please try refreshing the page, or return to the main menu
            </P>
            <StyledButton
                onClick={() => handleBackToMenu()}
            >
                {quizState.isLoggedIn ?
                    <>
                        Return to Menu
                    </>
                    :
                    <>
                        Return to Login
                    </>
                }
            </StyledButton>
        </StyledErrorBackground>
    )
}