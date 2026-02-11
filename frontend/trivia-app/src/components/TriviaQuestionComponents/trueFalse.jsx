import React,{useState,useEffect} from "react"
import { 
  StyledAnswerButton, 
  StyledQuestionTextDiv,
  StyledAnswerContainer,
  StyledQuestionContainer, 
} from "./styles"


export function TrueFalse({questionObj}) {
  return (
    <StyledQuestionContainer>
      <StyledQuestionTextDiv>
        {questionObj.question}
      </StyledQuestionTextDiv>
      <StyledAnswerContainer>
        {["True","False"].map((answerOption,index)=>{
          return(
            <StyledAnswerButton key={questionObj.question}>
              {answerOption}
            </StyledAnswerButton>
          )
        })}
      </StyledAnswerContainer>
    </StyledQuestionContainer>
  )
}