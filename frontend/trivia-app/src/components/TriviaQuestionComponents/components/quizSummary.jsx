import React, { useRef, useEffect, useState } from "react";
import { useQuizState, useQuizDispatch } from "../../../contexts/quiz/quizContext";
import { useNavigate } from "react-router-dom";
import {
    StyledButtonDiv,
    StyledSummaryTitle,
    StyledSummaryButton,
    StyledSummaryItemDiv,
    StyledSummaryDiv,
    StyledSummaryBackground,
    StyledReviewQuestionBlock,
    StyledSummaryScrollableDiv
} from ".";

export function QuizSummary({ questionsLength,fetchQuestions,setItemOffset,maxStreak }) {

    const quizDispatch = useQuizDispatch()
    const quizState = useQuizState()
    const hasSubmitted = useRef(false); // Our old StrictMode friend!
    const navigate = useNavigate()
    console.log(quizState.reviewQuestions)
    const ReviewQuestionsList = ({ }) => {
        return (
            <>
                <StyledSummaryItemDiv
                    height="fit-content"
                >
                    Review Missed Questions
                </StyledSummaryItemDiv>
                <StyledSummaryScrollableDiv>
                    {quizState.reviewQuestions.map((item, index) => {
                        return (
                            <StyledReviewQuestionBlock>
                                <StyledSummaryItemDiv>
                                    Question : {item.question}
                                </StyledSummaryItemDiv>
                                <StyledSummaryItemDiv>
                                    Your Choice : {item.your_answer}
                                </StyledSummaryItemDiv>
                                <StyledSummaryItemDiv>
                                    Correct Answer : {item.correct_answer}
                                </StyledSummaryItemDiv>
                            </StyledReviewQuestionBlock>
                        )
                    })}
                </StyledSummaryScrollableDiv>
            </>
        )
    }

    async function handlePlayAgain() {
        quizDispatch({ type: "RESET_GAME" }); // End the session intentionally
        quizDispatch({ type: "SET_QUESTIONS", payload: [] })
        setItemOffset(0)
        await fetchQuestions()
    }

    function handleChangeSettings(){
        quizDispatch({ type: "RESET_GAME" }); // End the session intentionally
        quizDispatch({type: "SET_QUESTIONS",payload:[]})
        console.log("go to settings")
        navigate("/settings",{replace:true})
    }

    function handleReturnToMenu(){
        quizDispatch({ type: "RESET_GAME" }); // End the session intentionally
        quizDispatch({ type: "SET_QUESTIONS", payload: [] })
        navigate("/", { replace: true })
    }

    useEffect(()=>{
        if (hasSubmitted.current) return
        hasSubmitted.current = true
        submitScore()
    },[])

    //handles updating the score state in the context
    async function submitScore() {
        try {
            const response = await fetch("http://localhost:5000/score", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userID: quizState.userID,
                    score: quizState.score,
                    answeredCorrectly: quizState.answeredCorrectly,
                    totalQuestions: quizState.triviaQuestions.length,
                    category: quizState.settingsState.category,
                    difficulty: quizState.settingsState.difficulty
                })
            })
            if (response.ok) {
                console.log("Score successfully saved!");
            } else {
                console.error("Failed with status:", response.status);
            }
        } catch (error) {
            console.error(error)
        }
    }

    return(
        <StyledSummaryBackground>
            <StyledSummaryTitle>
                Quiz Summary
            </StyledSummaryTitle>
            <StyledSummaryDiv>
                <StyledSummaryItemDiv>
                    Your Score : {quizState.score}
                </StyledSummaryItemDiv>
                <StyledSummaryItemDiv>
                    You answered {quizState.answeredCorrectly}/{questionsLength} questions correctly!!
                </StyledSummaryItemDiv>                
                <StyledSummaryItemDiv>
                    Your Max Streak is : {maxStreak}
                   
                </StyledSummaryItemDiv>  
                <StyledSummaryItemDiv>
                    Quiz Difficulty : {quizState.settingsState.difficulty}
                </StyledSummaryItemDiv>
                <ReviewQuestionsList/>
                <StyledButtonDiv>
                    <StyledSummaryButton
                        onClick={() => handlePlayAgain()}
                    >
                        Play Again!
                    </StyledSummaryButton>
                    <StyledSummaryButton
                        onClick={() => handleChangeSettings()}
                    >
                        Change Settings
                    </StyledSummaryButton>
                    <StyledSummaryButton
                        onClick={() => handleReturnToMenu()}
                    >
                        Return To Menu
                    </StyledSummaryButton>
                </StyledButtonDiv>
            </StyledSummaryDiv>
        </StyledSummaryBackground>
    )
 }