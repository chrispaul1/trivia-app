import React,{useState} from "react"
import { IoMdAlert } from "react-icons/io";
import {
  StyledInput, 
  StyledNumberLabel,
  StyledQuestionLabel,
  StyledNumberContainer
} from "."

export function NumberQuestion({question,handleAnswer,selectedAnswer}){

  const [questionLimit, setQuestionLimit] = useState(true)

  function validateNumberInput(value){
    if(value > question.limit || value < 0) {
      setQuestionLimit(false)
    }
    else{
      setQuestionLimit(true)
    } 
  }
  return(
    <StyledNumberContainer>
      <StyledQuestionLabel>
        {question.text} 
        {question.required && "*"}
        {!questionLimit && 
          <IoMdAlert 
            style={{color:"red",marginLeft:"5px"}}
            />
        }
      </StyledQuestionLabel>   
      <StyledNumberLabel
        htmlFor="number"
        key={question.id}
      >
        <StyledInput
          type='number'
          name={question.id}
          placeholder={0}
          min={1}
          max={question.limit}
          onChange={(e) => (handleAnswer(question.id,e.target.value),validateNumberInput(e.target.value))}
        />
      </StyledNumberLabel>
    </StyledNumberContainer>
  )
}
