import React,{useState,useEffect} from "react";
import { StyledDropdownContent, StyledDropdownItem } from "./styles";

export function DropdownContent({
  question,
  handleAnswer}) {

  function handleOptionClick(option){
    handleAnswer(question.id,option)
  }
  return(
    <StyledDropdownContent>
      {question.options.map((option)=>(
        <StyledDropdownItem
          key={option}
          onClick={()=>handleOptionClick(option)}
        >
            {option}
        </StyledDropdownItem>
      ))}
    </StyledDropdownContent>
  )
}