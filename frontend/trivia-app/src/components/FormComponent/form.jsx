import React, { useState, useEffect, useRef } from "react";
import { StyledFormOutline } from ".";
import { StyledButton } from "../../pages";
import { DropdownQuestion,NumberQuestion } from "./components";

export function Form({ questions, bufferSettings, handleStartQuiz, handleSettingsAnswer }) {
  const formRef = useRef(null)
  useEffect(() => {
    function handleClickOutside(event) {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [formRef])

  const isEndless = bufferSettings['mode'] == 'endless'

  return (
    <StyledFormOutline>
      <DropdownQuestion
        question={questions['mode']}
        handleSettingsAnswer={handleSettingsAnswer}
        selectedAnswer={bufferSettings['mode']}
      />

      <DropdownQuestion
        question={questions['category']}
        handleSettingsAnswer={handleSettingsAnswer}
        selectedAnswer={bufferSettings['category']} 
      />

      <DropdownQuestion
        question={questions['difficulty']}
        handleSettingsAnswer={handleSettingsAnswer}
        selectedAnswer={bufferSettings['difficulty']} 
      />

      <NumberQuestion
        question={questions['amount']}
        handleSettingsAnswer={handleSettingsAnswer}
        selectedAnswer={bufferSettings['amount']}
        disabled={isEndless}
      />

      <DropdownQuestion
        question={questions['type']}
        handleSettingsAnswer={handleSettingsAnswer}
        selectedAnswer={bufferSettings['type']}
      />

      <StyledButton
        onClick={()=>handleStartQuiz()}
      >
        Start Quiz
      </StyledButton>

    </StyledFormOutline>
  )
}