import React,{useEffect,useRef, useState} from "react"
import { 
  StyledChevronUp,
  StyledChevronDown, 
  StyledQuestionDiv, 
  StyledDropdownItem,
  StyledDropdownLabel,
  StyledDropdownContent, 
  StyledDropdownContainer,
 } from "."
import { FaCheck } from "react-icons/fa6";


export function DropdownQuestion({question, handleAnswer, selectedAnswer}) {

  const [isOpen,setIsOpen] = useState(false)
  const dropdownRef = useRef(null)
  const {id,text,options} = question
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

  function handleOptionClick(id,option){
    handleAnswer(id,option)
  }

  return (
    <StyledDropdownContainer
      ref={dropdownRef}
    >
      {question.text}
      <StyledQuestionDiv
        onClick={() => setIsOpen((isOpen) => !isOpen)}
      >
        {question.text}
        {isOpen ? <StyledChevronUp /> : <StyledChevronDown />}
      </StyledQuestionDiv>
      {isOpen && (
        <StyledDropdownContent>
          {question.options.map(option=>( 
            <StyledDropdownLabel
              key={option}
            >
              <StyledDropdownItem
                onClick={() => handleOptionClick(question.id,option)}
              >
                {selectedAnswer == option && 
                  <FaCheck/>
                }
                {option}
              </StyledDropdownItem>
            </StyledDropdownLabel>
          ))}
        </StyledDropdownContent>
      )}
    </StyledDropdownContainer>
  )
}