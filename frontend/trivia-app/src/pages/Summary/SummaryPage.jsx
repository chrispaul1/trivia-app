import React, { useRef, useEffect, useState } from "react";
import { useQuizState, useQuizDispatch } from "../../contexts/quiz/quizContext";
import { useNavigate } from "react-router-dom";
import { fetchTriviaQuestions, decodeAndShuffleQuestion } from "../../helpers/apiHelpers";
import {
    StyledButtonDiv,
    StyledSummaryDiv,
    StyledSummaryTitle,
    StyledSummaryButton,
    StyledSummaryItemDiv,
    StyledSummaryBackground,
    StyledReviewQuestionDiv,
    StyledReviewQuestionBlock,
    StyledSummaryScrollableDiv,
    StyledReviewQuestionHeaderDiv,
    StyledReviewQuestionContainer,
} from ".";
import { categoryNames } from "../../assets/categories";
import { Header } from "../../components";

export function QuizSummary({ }) {

    const hasFetched = useRef(false)
    const quizDispatch = useQuizDispatch()
    const quizState = useQuizState()
    const hasSubmitted = useRef(false); // Our old StrictMode friend!
    const navigate = useNavigate()

    const headerState = [
        {
            id: 1,
            placement: "middle",
            type: "title",
            text: "Review Missed Questions"
        }
    ]
    function ReviewQuestionsList({}){
        return (
            <StyledReviewQuestionContainer>
                <StyledReviewQuestionHeaderDiv>

                <Header
                    headerObjs={headerState}
                    />
                </StyledReviewQuestionHeaderDiv>
                <StyledSummaryScrollableDiv>
                   {quizState.reviewQuestions.length ? quizState.reviewQuestions.map((item, index) => {
                        return (
                            <StyledReviewQuestionBlock>
                                <StyledReviewQuestionDiv>
                                    Question : {item.question}
                                </StyledReviewQuestionDiv>
                                <StyledReviewQuestionDiv>
                                    Your Choice : {item.your_answer}
                                </StyledReviewQuestionDiv>
                                <StyledReviewQuestionDiv>
                                    Correct Answer : {item.correct_answer}
                                </StyledReviewQuestionDiv>
                            </StyledReviewQuestionBlock>
                        )
                    }) :
                        <StyledReviewQuestionDiv>
                            You have no missed questions
                        </StyledReviewQuestionDiv>
                    }
                </StyledSummaryScrollableDiv>
            </StyledReviewQuestionContainer>
        )
    }

    async function handlePlayAgain() {
        //quizDispatch({ type: "SET_QUESTIONS", payload: [] })
        const { settingsState: { category, difficulty, type, amount }, userID } = quizState
        
        //Category string cannot be passed to the backend, we have to send back the integer id for category
        let categoryID
        if (category != undefined && category != "" && category.toLowerCase() != "randomized categories") {
            categoryID = categoryNames.trivia_categories.find(cat => cat.name.toLowerCase() === category.toLowerCase()).id
        }

        //functions calls the fetchtriviaquestiosn function
        async function callFetchTriviaQuestions(){
            
            //check if an call was already made in the last 5 seconds
            if(quizState.isFetching && hasFetched.current){
                setTimeout(callFetchTriviaQuestions,1000)
                return;
            }

            //if we can call again, set the isFetching to true
            quizDispatch({ type: " START_FETCHING"})
            hasFetched.current = true

            //call the function, reset the game and set the questions
            try{
                console.log("lets get some questions")
                const questions = await fetchTriviaQuestions(categoryID, difficulty, type, amount, userID)
                quizDispatch({ type: "RESET_GAME" }); // End the session intentionally
                quizDispatch({ type: "SET_QUESTIONS", payload: decodeAndShuffleQuestion(questions) })
                navigate("/quiz", { replace: true })

            } catch (error) {

                alert("Error, Failed to fetch the questions for the game")
                quizDispatch({ type: "END_GAME" }); // End the session intentionally
                quizDispatch({ type: "RESET_GAME" });
                quizDispatch({ type: "RESET_QUIZ_SETTINGS" })
                navigate("/", { replace: true })

            } finally{

                setTimeout(()=>{
                    quizDispatch({ type: "STOP_FETCHING"})
                    hasFetched.current = false
                },5000)

            }
        }
        callFetchTriviaQuestions()
    }

    function handleChangeSettings() {
        quizDispatch({ type: "RESET_GAME" }); // End the session intentionally
        //quizDispatch({type: "SET_QUESTIONS",payload:[]})
        navigate("/settings", { replace: true })
    }

    function handleReturnToMenu() {
        quizDispatch({ type: "RESET_GAME" }); // End the session intentionally
        //quizDispatch({ type: "SET_QUESTIONS", payload: [] })
        navigate("/", { replace: true })
    }

    useEffect(() => {
        if (hasSubmitted.current) return
        hasSubmitted.current = true
        submitScore()
    }, [])

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
                    difficulty: quizState.settingsState.difficulty,
                    mode: quizState.settingsState.mode
                })
            })
            if (response.ok) {
            } else {
                console.error("Failed with status:", response.status);
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <StyledSummaryBackground>
            <StyledSummaryDiv>
                <StyledSummaryItemDiv>
                    Your Score : {quizState.score}
                </StyledSummaryItemDiv>
                <StyledSummaryItemDiv>
                    You answered {quizState.answeredCorrectly}/{quizState.triviaQuestions.length} questions correctly!!
                </StyledSummaryItemDiv>
                <StyledSummaryItemDiv>
                    Your Max Streak is : {quizState.maxStreak}
                </StyledSummaryItemDiv>
                <StyledSummaryItemDiv>
                    Quiz Difficulty : {quizState.settingsState.difficulty}
                </StyledSummaryItemDiv>

                <ReviewQuestionsList />

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