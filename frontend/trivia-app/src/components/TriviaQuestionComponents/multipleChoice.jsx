import React,{useState,useEffect} from "react"
import { 
  StyledAnswerButton, 
  StyledQuestionTextDiv,
  StyledAnswerContainer,
  StyledMultipleContainer, 
} from "./styles"
export function MultipleChoice({questionObj}) {

  let optionArr = questionObj.incorrect_answers.concat(questionObj.correct_answer)
  optionArr = optionArr.sort(() => Math.random() - 0.5)

  return (
    <StyledMultipleContainer>
      <StyledQuestionTextDiv>
        {questionObj.question}
      </StyledQuestionTextDiv>
      <StyledAnswerContainer>
        {optionArr.map((answerOption, index) => (
          <StyledAnswerButton key={index}>
            {answerOption}
          </StyledAnswerButton>
        ))}
      </StyledAnswerContainer>
    </StyledMultipleContainer>
  )
}