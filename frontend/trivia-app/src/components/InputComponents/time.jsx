import React, { useEffect } from "react"
import {
  StyledInputDiv,
  StyledTimeLabel,
  StyledHourInput,
  StyledMinuteInput,
  StyledSecondInput,
  StyledQuestionLabel,
  StyledTimeContainer,
  StyledInputContainer
} from '.'
import { useQuizDispatch } from "../../context/quizContext" 

export function TimeQuestion({question,handleAnswer,selectedAnswer}){

  const quizDispatch = useQuizDispatch()
  //Sets the array answer intially
  useEffect(()=>{
    handleAnswer(question.id,[0,0])
  },[])
  
  //function handles setting the answer in the answers state
  function HandleTimeInput(answer,index){
      var answerArr = JSON.parse(JSON.stringify(selectedAnswer));
      answerArr[index] = answer
      handleAnswer(question.id,answerArr)
      let id = question.id
      let value = answerArr
      quizDispatch(({type: "SET_PARAMETERS", payload: {id, value}}))
  }

  return(
    <StyledTimeContainer>
      <StyledQuestionLabel>
        {question.text}
      </StyledQuestionLabel>
      <StyledInputDiv>
        <StyledInputContainer>
          <StyledTimeLabel>
            Minutes
          </StyledTimeLabel>
          <StyledMinuteInput
            type='number'
            id={"minute"}
            min={0}
            max={60}
            onChange={(e) => HandleTimeInput(e.target.value, 0)}
          />
        </StyledInputContainer>
        <StyledInputContainer>
          <StyledTimeLabel>
            Seconds
          </StyledTimeLabel>
          <StyledSecondInput
            type='number'
            id={"second"}
            min={0}
            max={59}
            onChange={(e) => HandleTimeInput(e.target.value, 1)}
          />
        </StyledInputContainer>
      </StyledInputDiv>
    </StyledTimeContainer>
  )
}