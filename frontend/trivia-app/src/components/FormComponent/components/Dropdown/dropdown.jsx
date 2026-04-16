import React,{useEffect,useRef, useState} from "react"
import { 
  StyledIconWrapper,
  StyledDropdownItem,
  StyledQuestionLabel, 
  StyledDropdownLabel,
  StyledDropdownContent, 
  StyledDropdownContainer,
 } from "./dropdownStyles"
import { FaCheck } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";

export function DropdownQuestion({question, handleAnswer, selectedAnswer}) {
  const [isOpen,setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownRef])

  function handleOptionClick(id,value){
    handleAnswer(id, value)
    setIsOpen(false)
  }

  return (
    <StyledDropdownContainer
      ref={dropdownRef}
    >
      <StyledQuestionLabel
        onClick={() => setIsOpen((isOpen) => !isOpen)}
      >
        {question.label} 
        <StyledIconWrapper>
          {isOpen ? <FaChevronDown/> : <FaChevronUp/>}
        </StyledIconWrapper>
      </StyledQuestionLabel>
      {isOpen && (
        <StyledDropdownContent>
          {question.options.map(option=>( 
            <StyledDropdownLabel
              key={option.text ? option.text : option}
            >
              <StyledDropdownItem
                onClick={() => handleOptionClick(question.id, option.text ? option.value.toLowerCase() : option.toLowerCase())}
              >
                {option.text || option}
                {(option.value == selectedAnswer.toLowerCase() || String(option).toLowerCase() == selectedAnswer.toLowerCase()) && 
                  <FaCheck/>
                }                
              </StyledDropdownItem>
            </StyledDropdownLabel>
          ))}
        </StyledDropdownContent>
      )}
    </StyledDropdownContainer>
  )
}