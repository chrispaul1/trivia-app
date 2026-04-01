import React,{useState,useEffect,useMemo} from "react"
import { 
  StyledAnswerButton, 
} from "."

export function MultipleChoice({ question,selectedAnswer,handleAnswerScoring }) {
  
  const [isDisabled, setIsDisabled] = useState(false);

  function handleAnswerClick(answerOption){
    setIsDisabled(true)
    handleAnswerScoring(answerOption,question.correct_answer,question.difficulty)
  }

  return (
    <>
      {question.shuffledAnswers.map((answerOption, index) => {
        let buttonStatus = "default"

        if (selectedAnswer !== ""){
          const isTheAnswerCorrect = answerOption === question.correct_answer
          const didUserClickThisOption = answerOption === selectedAnswer
          if (isTheAnswerCorrect){
            buttonStatus="correct"
          } 
          else if (didUserClickThisOption){
            buttonStatus="incorrect"
          }
          else{
            buttonStatus="unselected"
          }
        }
        return(
          <StyledAnswerButton 
            key={answerOption}
            onClick={() => handleAnswerClick(answerOption)}
            $status={buttonStatus}
            disabled={isDisabled}
          >
            {answerOption}
          </StyledAnswerButton>
        )
      })}
    </>
  )
}