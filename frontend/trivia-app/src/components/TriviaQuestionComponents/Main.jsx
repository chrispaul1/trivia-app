import React, { useState, useEffect } from "react"
import { MultipleChoice, TrueFalse } from "."
import { useQuizState, useQuizDispatch } from "../../context/quizContext";

export function TriviaQuestionsComponent({ triviaQuestions,mode="standard"}) {

  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 1;
  const endOffset = itemOffset + itemsPerPage
  const pageCount = Math.ceil(triviaQuestions.length / itemsPerPage)
  //stores the curretn question sliced from the trivia questions
  const currentQuestion = triviaQuestions.slice(itemOffset, endOffset)
  const [quizFinished, setQuizFinished] = useState(false)
  //tracks the current number of questions answered correctly
  const [currentStreak,setCurrentStreak] = useState(0)
  //stores the longest number of answered correctly
  const [maxStreak,setMaxStreak] = useState(0)
  const quizDispatch = useQuizDispatch()
  const quizState = useQuizState()

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
    //sets the itemoffset to go to display the next question
    setTimeout(()=>{
      if (itemOffset + 1 >= triviaQuestions.length){
        setQuizFinished(true)
      } else {
        console.log("go to next question")
        setItemOffset(prevOffset => prevOffset +1)
      }
    },2000);
  }

  //handles submiting the score to the backend based on the quizFinished state
  useEffect(() => {
    if (quizFinished) {
      async function SubmitScore() {
        try {
          console.log("submit the score")
          const response = await fetch("http://localhost:5000/score", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: {
              userID: quizState.userID,
              score: quizState.score,
              answeredCorrectly: quizState.answeredCorrectly,
              totalQuestions: triviaQuestions.length(),
              category: quizState.settingsState.category,
              difficulty: quizState.settingsState.difficulty
            }
          })
          const res = await response.json()
          console.log(" score response:", res)

        } catch (error) {

        }

      }
      SubmitScore()
    }
  }, [quizFinished])

  return (
    <>
      {!quizFinished ?
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
        <div>
          <div>
            QUIZ SUMMARY
          </div>
          <div>
            Your Score :

          </div>
        </div>
      }
    </>
  )
}