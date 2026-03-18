import React, { useState, useEffect } from "react"
import { MultipleChoice, TrueFalse, QuizSummary } from "."
import { useQuizState, useQuizDispatch } from "../../context/quizContext";

export function TriviaQuestionsComponent({ triviaQuestions,fetchQuestions,mode="standard"}) {

  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 1;
  const endOffset = itemOffset + itemsPerPage
  const pageCount = Math.ceil(triviaQuestions.length / itemsPerPage)
  //stores the curretn question sliced from the trivia questions
  const currentQuestion = triviaQuestions.slice(itemOffset, endOffset)
  const [showSummary,setShowSummary] = useState(false)
  //tracks the current number of questions answered correctly
  const [currentStreak,setCurrentStreak] = useState(0)
  //stores the longest number of answered correctly
  const [maxStreak,setMaxStreak] = useState(0)
  const quizDispatch = useQuizDispatch()
  const quizState = useQuizState()
  const isQuizFinished = triviaQuestions.length > 0 && itemOffset >= triviaQuestions.length

  //handles what score to add to the users score and increments it
  function handleAnswerScoring(selectedAnswer,correctAnswer,qDifficulty){
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
  
      quizDispatch({type: "INCREMENT_SCORE",score: pointsEarned})
  
      quizDispatch({type: "INCREMENT_CORRECT_ANSWERS"})
    }
    else{
      let qObj = {
        question:currentQuestion[0].question,
        your_answer:selectedAnswer,
        correct_answer:currentQuestion[0].correct_answer
      }
      quizDispatch({type:"ADD_TO_REVIEW_QUESTIONS",payload:qObj})
    }

    //sets the itemoffset to go to display the next question
    setTimeout(()=>{
      setItemOffset(prevOffset => prevOffset +1)
    },2000);
  }

  useEffect(()=>{
    console.log("wrong questions",quizState.reviewQuestions)
  },[quizState.reviewQuestions])

  return (
    <>
      {!isQuizFinished ?
        currentQuestion.map((questionObj, index) => {
          switch (questionObj.type) {
            case "multiple":
              return (
                <MultipleChoice
                  key={questionObj.question}
                  questionObj={questionObj}
                  setItemOffset={setItemOffset}
                  questionNumber={itemOffset + 1}
                  handleAnswerScoring={handleAnswerScoring}
                />
              )
            case "boolean":
              return (
                <TrueFalse
                  key={questionObj.question}
                  questionObj={questionObj}
                  setItemOffset={setItemOffset}
                  questionNumber={itemOffset + 1}
                  handleAnswerScoring={handleAnswerScoring}
                />
              )
            default:
          }
        }) :
        <QuizSummary
          questionsLength={triviaQuestions.length}
          fetchQuestions={fetchQuestions}
          setItemOffset={setItemOffset}
        />
      }
    </>
  )
}