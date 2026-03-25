import React, { useState, useEffect, useRef } from "react";
import { StyledFormOutline } from ".";
import { DropdownQuestion, NumberQuestion, TimeQuestion } from "../InputComponents";

export function Form({ questions, handleAnswer, answers }) {
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

  const isEndless = answers['mode']

  return (
    <StyledFormOutline>
      <DropdownQuestion
        question={questions['mode']}
        handleAnswer={handleAnswer}
        selectedAnswer={answers['mode']}
      />

      <DropdownQuestion
        question={questions['category']}
        handleAnswer={handleAnswer}
        selectedAnswer={answers['category']} 
      />

      <DropdownQuestion
        question={questions['difficulty']}
        handleAnswer={handleAnswer}
        selectedAnswer={answers['difficulty']} 
      />

      <NumberQuestion
        question={questions['amount']}
        handleAnswer={handleAnswer}
        selectedAnswer={answers['amount']}
      />

      <DropdownQuestion
        question={questions['type']}
        handleAnswer={handleAnswer}
        selectedAnswer={answers['type']}
      />
    </StyledFormOutline>
  )
}