import React,{useState,useEffect,useRef} from "react";
import {DropdownContent } from ".";
import { StyledDropdownOutline, 
  StyledDropdown, 
  StyledChevronDown,
  StyledChevronUp } from ".";

export function DropDown({question,handleAnswer,setAnswers}) {
  const [isOpen,setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(()=>{
    function handleClickOutside(event){
      if(dropdownRef.current && !dropdownRef.current.contains(event.target)){
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown',handleClickOutside)
    return () =>{
      document.removeEventListener('mousedown',handleClickOutside)
    }
  },[dropdownRef])

  return(
    <StyledDropdownOutline
      onClick={()=>setIsOpen((isOpen) => !isOpen)}
      ref={dropdownRef}
    >
      <StyledDropdown>
        {question.text}
        {isOpen ? <StyledChevronUp/> : <StyledChevronDown/>}
      </StyledDropdown>
      {isOpen && 
        <DropdownContent
          question={question}
          handleAnswer={handleAnswer}
        />
      }
    </StyledDropdownOutline>
  )
}