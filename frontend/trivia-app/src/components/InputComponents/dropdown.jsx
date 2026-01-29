import React,{useEffect,useRef, useState} from "react"
import { 
  StyledChevronUp,
  StyledChevronDown, 
  StyledDropdownItem,
  StyledQuestionLabel, 
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
    setIsOpen(false)
  }

  return (
    <StyledDropdownContainer
      ref={dropdownRef}
    >
      {question.label}
      <StyledQuestionLabel
        onClick={() => setIsOpen((isOpen) => !isOpen)}
      >
        {question.label}
        {isOpen ? <StyledChevronUp /> : <StyledChevronDown />}
      </StyledQuestionLabel>
      {isOpen && (
        <StyledDropdownContent>
          {question.options.map(option=>( 
            <StyledDropdownLabel
              key={option.text ? option.text : option}
            >
              <StyledDropdownItem
                onClick={() => handleOptionClick(question.id,option.text ? option.value.toLowerCase() : option.toLowerCase())}
              >
                {option.text || option}
                {(option.value == selectedAnswer || option == selectedAnswer) && 
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