import React,{useState,useEffect} from "react"
import { 
  StyledAnswerButton, 
  StyledQuestionTextDiv,
  StyledAnswerContainer,
  StyledQuestionContainer, 
} from "./styles"


export function TrueFalse({ questionObj,setItemOffset,questionNumber}) {
  return (
    <StyledQuestionContainer>
      <h2>
        {questionNumber}.{" "}{questionObj.category}
      </h2>
      <StyledQuestionTextDiv>
        {questionObj.question}
      </StyledQuestionTextDiv>
      <StyledAnswerContainer>
        {["True","False"].map((answerOption,index)=>{
          return(
            <StyledAnswerButton key={answerOption}>
              {answerOption}
            </StyledAnswerButton>
          )
        })}
      </StyledAnswerContainer>
    </StyledQuestionContainer>
  )
}