import React from "react"
import {
  StyledInput, 
  StyledQuestionDiv,
  StyledNumberLabel,
  StyledNumberContainer
} from "."

export function NumberQuestion({question,handleAnswer,selectedAnswer}){

  return(
    <StyledNumberContainer>
      <StyledQuestionDiv>
        {question.text}
      </StyledQuestionDiv>   
      <StyledNumberLabel
        htmlFor="number"
        key={question.id}
      >
        <StyledInput
          type='number'
          name={question.id}
          placeholder={selectedAnswer || 0}
          min={1}
          max={question.limit}
          onChange={(e) => handleAnswer(question.id,e.target.value)}
        />
      </StyledNumberLabel>
    </StyledNumberContainer>
  )
}
