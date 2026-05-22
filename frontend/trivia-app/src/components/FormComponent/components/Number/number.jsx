import React,{useEffect, useState} from "react"
import { IoMdAlert } from "react-icons/io";
import {
  StyledInput, 
  StyledNumberLabel,
  StyledNumberContainer
} from "./numberStyles"
import { StyledQuestionLabel } from "../Dropdown/dropdownStyles";

export function NumberQuestion({ question, handleInputChange, selectedAnswer,disabled}){

  const [validAns, setValidAns] = useState(false)

  function validateNumberInput(value){
    if(value > question.limit || value <= 0) {
      setValidAns(false)
      handleInputChange(0)
    }
    else{
      setValidAns(true)
      handleInputChange(value)
    } 
  }

  useEffect(()=>{
    if(disabled){
      handleInputChange(10)
    } else{
      handleInputChange(0)
    }
  },[disabled])

  return(
    <StyledNumberContainer>
      <StyledQuestionLabel>
        {question.text} 
        {question.required && "*"}
        {!validAns &&  !disabled &&
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
          $status={disabled ? 'disabled' : 'active'}
        />
      </StyledNumberLabel>
    </StyledNumberContainer>
  )
}
