import React,{useState,useEffect} from "react"
import { 
  StyledAnswerButton, 
} from "."

export function TrueFalse({ questionObj, selectedAnswer,handleAnswerScoring }) {
  
  const [isDisabled, setIsDisabled] = useState(false);
  
  function handleAnswerClick(answerOption) {
    setIsDisabled(true)
    handleAnswerScoring(answerOption, questionObj.correct_answer, questionObj.difficulty)
  }

  return ( 
      <>
        {["True","False"].map((answerOption, index) => {
          let buttonStatus = "default"
          if(selectedAnswer !== null){
            const isTheAnswerCorrect = answerOption === questionObj.correct_answer
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