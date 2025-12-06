import React,{useState,useEffect,useRef} from "react";
import {FormContent } from ".";
import { StyledFormOutline} from ".";

export function Form({questions,handleAnswer,answers}) {
  const formRef = useRef(null)

  useEffect(()=>{
    function handleClickOutside(event){
      if(formRef.current && !formRef.current.contains(event.target)){
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown',handleClickOutside)
    return () =>{
      document.removeEventListener('mousedown',handleClickOutside)
    }
  },[formRef])

  return (
    <StyledFormOutline>
      <FormContent
        questions={questions}
        handleAnswer={handleAnswer}
        answers={answers}
      />
    </StyledFormOutline>
  )
}