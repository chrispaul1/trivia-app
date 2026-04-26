import React, { useState, useEffect, useMemo, useRef } from "react"
import {
	StyledPaginate,
	StyledQuestionsOutline,
	StyledQuestionsBackground,
} from ".."
import { TriviaQuestionsComponent } from "../../components"
import { useWindowSize } from "../../hooks/SizeHook"
import { replace, useLocation, useNavigate } from "react-router-dom"
import { categoryNames } from "../../assets/categories"
import { useQuizState, useQuizDispatch } from "../../contexts/quiz/quizContext"
import { fetchTriviaQuestions, decodeAndShuffleQuestion } from "../../helpers/apiHelpers"
import "react-loading-skeleton/dist/skeleton.css";

export function QuizPage() {

	const quizState = useQuizState()
	const quizDispatch = useQuizDispatch()
	const hasFetched = useRef(false)
	const navigate = useNavigate()

	//calls the fetchQuestion funcs and prevents the func being called twice
	useEffect(() => {
		
		if (!quizState.isGameStarted) return;
		
		if (hasFetched.current) return;
		
		if (quizState.isFetching) return;

		if (quizState.triviaQuestions.length > 0){
			hasFetched.current = true
			return
		}
		hasFetched.current = true
		handleLoadQuestion()
	}, [quizState.isGameStarted, quizState.isFetching])

	useEffect(() => {
		//if the userID and username gets removed, go back to the login page
		if (!quizState.userID) {
			quizDispatch({ type: "END_GAME" })
			quizDispatch({ type: "RESET_GAME" }); // End the session intentionally
			quizDispatch({ type: "RESET_QUIZ_SETTINGS" })
			navigate('/', { replace: true });
		}
		console.log("quiz state : ",quizState)
	}, [])

	//if the game hasn't started officially, send the user back to the menu
	useEffect(() => {
		if (!quizState.isGameStarted || !quizState.userID) {
			quizDispatch({ type: "RESET_GAME" }); // End the session intentionally
			quizDispatch({ type: "RESET_QUIZ_SETTINGS" })
			navigate('/', { replace: true });
		}

	}, [quizState.isGameStarted, navigate])


	//fetches the questions by calling an api endpoint with the settings data
	async function handleLoadQuestion(isRefill = false) {

		// If an apicall was done recently, leave the func
		if (quizState.isFetching) return;
		quizDispatch({ type: "START_FETCHING" })

		try {

			const { settingsState: { category, difficulty, type, amount }, userID } = quizState

			//Category string cannot be passed to the backend, we have to send back the integer id for category
			let categoryID
			if (category != undefined && category != "" && category.toLowerCase() != "randomized categories") {
				categoryID = categoryNames.trivia_categories.find(cat => cat.name.toLowerCase() === category.toLowerCase()).id
			}
			const newQuestions = await fetchTriviaQuestions(categoryID, difficulty, type, amount, userID)

			if (newQuestions && newQuestions.length > 0) {
				if (isRefill) {
					quizDispatch({ type: "APPEND_QUESTIONS", payload: decodeAndShuffleQuestion(newQuestions) })
				} else {
					quizDispatch({ type: "SET_QUESTIONS", payload: decodeAndShuffleQuestion(newQuestions) })
				}
				navigate('/quiz',{ replace: true })
			}

		} catch (error) {

			quizDispatch({ type: "END_GAME" }); // End the session intentionally
			quizDispatch({ type: "RESET_GAME" });
			quizDispatch({ type: "RESET_QUIZ_SETTINGS" })
			navigate('/', { replace: true })
		} finally {

			setTimeout(() => {
				quizDispatch({ type: "STOP_FETCHING" })
			}, 5000)

		}
	}

	return (
		<StyledQuestionsBackground>
			<StyledQuestionsOutline>
				<TriviaQuestionsComponent
					handleLoadQuestion={handleLoadQuestion}
				/>
			</StyledQuestionsOutline>

		</StyledQuestionsBackground>
	)
}
