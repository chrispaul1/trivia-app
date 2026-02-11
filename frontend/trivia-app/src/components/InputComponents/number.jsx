import React,{useState} from "react"
import { IoMdAlert } from "react-icons/io";
import {
  StyledInput, 
  StyledNumberLabel,
  StyledQuestionLabel,
  StyledNumberContainer
} from "."
import { useQuizDispatch } from "../../context/quizContext"

export function NumberQuestion({question,handleAnswer,selectedAnswer}){

  const [invalidAns, setInvalidAns] = useState(true)
  const quizDispatch = useQuizDispatch()

  function dispatchNumberAnswer(value){
    quizDispatch({type:"SET_PARAMETERS", payload:{id,value}})
    handleAnswer(question.id,value)
  }

  function validateNumberInput(value){
    if(value > question.limit || value <= 0) {
      setInvalidAns(false)
      handleAnswer(question.id,0)
      quizDispatch({type:"SET_PARAMETERS", payload:{id:question.id,option:0}})
    }
    else{
      setInvalidAns(true)
    } 
  }
  return(
    <StyledNumberContainer>
      <StyledQuestionLabel>
        {question.text} 
        {question.required && "*"}
        {!invalidAns && 
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
          onChange={(e) => (handleAnswer(question.id,e.target.value),validateNumberInput(e.target.value),dispatchNumberAnswer(e.target.value))}
        />
      </StyledNumberLabel>
    </StyledNumberContainer>
  )
}
