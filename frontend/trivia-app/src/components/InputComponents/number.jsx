import React,{useState} from "react"
import { IoMdAlert } from "react-icons/io";
import {
  StyledInput, 
  StyledNumberLabel,
  StyledQuestionLabel,
  StyledNumberContainer
} from "."

export function NumberQuestion({question,handleAnswer,selectedAnswer,disabled}){

  const [validAns, setValidAns] = useState(false)

  function validateNumberInput(value){
    if(value > question.limit || value <= 0) {
      setValidAns(false)
      handleAnswer(question.id,0)
    }
    else{
      setValidAns(true)
      handleAnswer(question.id, value)
    } 
  }
  return(
    <StyledNumberContainer>
      <StyledQuestionLabel>
        {question.text} 
        {question.required && "*"}
        {!validAns && 
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
          onChange={(e) => validateNumberInput(e.target.value)}
          disabled={disabled}
        />
      </StyledNumberLabel>
    </StyledNumberContainer>
  )
}
