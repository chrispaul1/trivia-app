import React, { useState, useEffect } from "react"
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

export function TriviaQuestionsComponent({ isLoading,triviaQuestions, fetchQuestions}) {

	const [itemOffset, setItemOffset] = useState(0);
	const itemsPerPage = 1;
	const endOffset = itemOffset + itemsPerPage
	const pageCount = Math.ceil(triviaQuestions.length / itemsPerPage)

	//stores the curretn question sliced from the trivia questions
	const currentQuestion = triviaQuestions.slice(itemOffset, endOffset)
	const [selectedAnswer, setSelectedAnswer] = useState("")

	//tracks the current number of questions answered correctly
	const [currentStreak, setCurrentStreak] = useState(0)
	//stores the longest number of answered correctly
	const [maxStreak, setMaxStreak] = useState(0)

	const quizDispatch = useQuizDispatch()
	const quizState = useQuizState()
	const isQuizFinished = triviaQuestions.length > 0 && itemOffset >= triviaQuestions.length

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

			setCurrentStreak(prevCount => prevCount +1)
			if(currentStreak > maxStreak){
				setMaxStreak(currentStreak)
			}

			quizDispatch({ type: "INCREMENT_SCORE", score: pointsEarned })
			quizDispatch({ type: "INCREMENT_CORRECT_ANSWERS" })
		}
		else {
			let qObj = {
				question: currentQuestion[0].question,
				your_answer: selectedAnswer,
				correct_answer: currentQuestion[0].correct_answer
			}
			quizDispatch({ type: "ADD_TO_REVIEW_QUESTIONS", payload: qObj })
			setCurrentStreak(0)
		}

		//sets the itemoffset to go to display the next question
		setTimeout(() => {
			setSelectedAnswer("")
			setItemOffset(prevOffset => prevOffset + 1)
		}, 2000);

		//fetches more questions in the endless mode if the user is close to finishing the questions
		if (triviaQuestions.length - (itemOffset+1) <= 5 && quizState.settingsState.mode == "endless") {
			fetchQuestions(true)
		}
	}

	const renderTime = ({ remainingTime }) => {

		if (selectedAnswer != "" && selectedAnswer != null) {
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
	console.log(currentQuestion)

	return (
		<>
			{!isQuizFinished ?
				currentQuestion.map((questionObj, index) => {
					return (
						<StyledTriviaBackground
							key={questionObj.question}
						>
							<SkeletonTheme baseColor="#202020" highlightColor="#444">
								<StyledQuestionContainer>
									<StyledQuestionTextDiv>

										{questionObj.category}

									</StyledQuestionTextDiv>
									<StyledQuestionTextDiv>

										{itemOffset + 1}.{" "}{questionObj.question}

									</StyledQuestionTextDiv>
								</StyledQuestionContainer>

								<StyledTimerContainer>

									<CountdownCircleTimer
										key={itemOffset + 1}
										isPlaying={selectedAnswer ? false : true}
										duration={10}
										colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
										colorsTime={[10, 6, 3, 0]}
										onComplete={() => (selectedAnswer == null && setItemOffset(prev => prev + 1))}
									>
										{renderTime}
									</CountdownCircleTimer>


								</StyledTimerContainer>
								<StyledAnswerContainer>

									{questionObj.type === "multiple" ? (
										<MultipleChoice
											key={questionObj.question}
											questionObj={questionObj}
											selectedAnswer={selectedAnswer}
											handleAnswerScoring={handleAnswerScoring}
										/>
									) : (
										<TrueFalse
											key={questionObj.question}
											questionObj={questionObj}
											selectedAnswer={selectedAnswer}
											handleAnswerScoring={handleAnswerScoring}
										/>
									)}

								</StyledAnswerContainer>
							</SkeletonTheme>
						</StyledTriviaBackground>
					)
				}) :
				(
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