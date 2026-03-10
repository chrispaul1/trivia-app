import React,{useState,useEffect,useMemo} from "react"
import { 
  StyledAnswerButton, 
  StyledQuestionTextDiv,
  StyledAnswerContainer,
  StyledQuestionContainer, 
} from "./styles"
import { useQuizState, useQuizDispatch } from "../../context/quizContext";

export function MultipleChoice({ questionObj, setItemOffset,questionNumber }) {
  console.log(questionObj)
  const [showFeedback, setShowFeedback] = useState(false);
  const quizState = useQuizState()
  const quizDispatch = useQuizDispatch()

  function handleAnswerClick(selectedAnswer){
    const isCorrect = selectedAnswer === questionObj.correct_answer

    if(isCorrect){
      quizDispatch({
        type:"INCREMENT_SCORE"
      })
    }
    setShowFeedback(true)
  }

  return (
    <StyledQuestionContainer>
      <h2>
        {questionNumber}.{" "}{questionObj.category}
      </h2>
      <StyledQuestionTextDiv>
        {questionObj.question}
      </StyledQuestionTextDiv>
      <StyledAnswerContainer>
        {questionObj.shuffledAnswers.map((answerOption, index) => (
          <StyledAnswerButton 
            key={answerOption}
            onClick={() => handleAnswerClick(answerOption)}
            //$isselected={selectedAnswer === answerOption}
          >
            {answerOption}
          </StyledAnswerButton>
        ))}
      </StyledAnswerContainer>
    </StyledQuestionContainer>
  )
}