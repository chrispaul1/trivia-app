import React, { useState, useEffect, useRef } from "react"
import { MultipleChoice, TrueFalse, QuizSummary } from "."
import { useQuizState, useQuizDispatch } from "../../contexts/quiz/quizContext";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import "react-loading-skeleton/dist/skeleton.css";
import {
	StyledAnswerButton,
	StyledTimerContainer,
	StyledQuestionTextDiv,
	StyledAnswerContainer,
	StyledTriviaBackground,
	StyledQuestionContainer,
} from '.'

export function TriviaQuestionsComponent({ isLoading, fetchQuestions }) {

	const quizDispatch = useQuizDispatch()
	const quizState = useQuizState()
	const { triviaQuestions } = quizState
	const [isQuizFinished, setIsQuizFinished] = useState(false)
	const [itemOffset, setItemOffset] = useState(0);
	const itemsPerPage = 1;
	const endOffset = itemOffset + itemsPerPage
	const pageCount = Math.ceil(triviaQuestions.length / itemsPerPage)

	//stores the curretn question sliced from the trivia questions
	const question = triviaQuestions.slice(itemOffset, endOffset)[0]
	const [selectedAnswer, setSelectedAnswer] = useState("")

	//tracks the current number of questions answered correctly
	const [currentStreak, setCurrentStreak] = useState(0)
	//stores the longest number of answered correctly
	const [maxStreak, setMaxStreak] = useState(0)

	const isEndless = quizState.settingsState.mode == "endless"
	const timerKey = isEndless ? "endless-timer" : itemOffset

	useEffect(() => {
		console.log("current questions", triviaQuestions)
	}, [triviaQuestions])

	//handles what score to add to the users score and increments it
	function handleAnswerScoring(selectedAnswer, correctAnswer, qDifficulty) {
		setSelectedAnswer(selectedAnswer)
		const isCorrect = selectedAnswer === correctAnswer
		if (isCorrect) {
			let pointsEarned = 0;
			switch (qDifficulty) {
				case 'easy':
					pointsEarned = 100;
					break;
				case 'medium':
					pointsEarned = 200;
					break;
				case 'hard':
					pointsEarned = 300;
					break;
				default:
					pointsEarned = 100;
			}

			setCurrentStreak(prevCount => prevCount + 1)
			if (currentStreak > maxStreak) {
				setMaxStreak(currentStreak)
			}

			quizDispatch({ type: "INCREMENT_SCORE", score: pointsEarned })
			quizDispatch({ type: "INCREMENT_CORRECT_ANSWERS" })
		}
		else {
			let qObj = {
				question: question.question,
				your_answer: selectedAnswer,
				correct_answer: question.correct_answer
			}
			quizDispatch({ type: "ADD_TO_REVIEW_QUESTIONS", payload: qObj })
			setCurrentStreak(0)
		}

		//sets the itemoffset to go to display the next question
		setTimeout(() => {
			setSelectedAnswer("")
			setItemOffset(prevOffset => prevOffset + 1)
		}, 1000);


		//fetches more questions in the endless mode if the user is close to finishing the questions
		if (triviaQuestions.length - (itemOffset + 1) <= 3 && quizState.settingsState.mode == "endless") {
			console.log("fetch more questions")
			fetchQuestions(true)
		}

		if (triviaQuestions.length > 0 && itemOffset == triviaQuestions.length-1) {
			setIsQuizFinished(true)
			return
		}
	}

	const renderTime = ({ remainingTime }) => {

		if (selectedAnswer != "" && selectedAnswer != null && !isEndless) {
			return <div className="timer">Moving onto Next Question...</div>;
		}

		if (remainingTime === 0) {
			return <div className="timer">Too late...</div>;
		}

		return (
			<div className="timer">
				<div className="text">Remaining</div>
				<div className="value">{remainingTime}</div>
				<div className="text">seconds</div>
			</div>
		);
	};

	return (
		<>
			{!isQuizFinished && question ?(
				<StyledTriviaBackground>
					<SkeletonTheme baseColor="#202020" highlightColor="#444">
						<StyledQuestionContainer>
							<StyledQuestionTextDiv>

								{question.category}

							</StyledQuestionTextDiv>
							<StyledQuestionTextDiv>

								{itemOffset + 1}.{" "}{question.question}

							</StyledQuestionTextDiv>
						</StyledQuestionContainer>

						<StyledTimerContainer>

							<CountdownCircleTimer
								key={timerKey}
								isPlaying={!isEndless && selectedAnswer ? false : true}
								duration={isEndless ? 100 : 10}
								colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
								colorsTime={[10, 6, 3, 0]}
								onComplete={() => {
									if (isEndless) {
										setItemOffset(triviaQuestions.length)
									} else {
										handleAnswerScoring(
											"Time Expired",
											question.correct_answer,
											question.difficulty
										)
									}
								}}
							>
								{renderTime}
							</CountdownCircleTimer>


						</StyledTimerContainer>
						<StyledAnswerContainer>

							{question.type === "multiple" ? (
								<MultipleChoice
									key={question.question}
									question={question}
									selectedAnswer={selectedAnswer}
									handleAnswerScoring={handleAnswerScoring}
								/>
							) : (
								<TrueFalse
									key={question.question}
									question={question}
									selectedAnswer={selectedAnswer}
									handleAnswerScoring={handleAnswerScoring}
								/>
							)}

						</StyledAnswerContainer>
					</SkeletonTheme>
				</StyledTriviaBackground>
			) :(
				<QuizSummary
					questionsLength={triviaQuestions.length}
					fetchQuestions={fetchQuestions}
					setItemOffset={setItemOffset}
					maxStreak={maxStreak}
				/>
			)}
		</>
	)
}