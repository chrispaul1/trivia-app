import React,{useState,useEffect} from "react";
import { DropdownQuestion,NumberQuestion,TimeQuestion } from "../InputComponents";

export function FormContent({questions,handleAnswer,answers}) {

  return (
    <>
      {questions.map(question => {
        switch (question.type) {
          case 'dropdown':
            return (
              <DropdownQuestion
                key={question.id}
                question={question}
                handleAnswer={handleAnswer}
                selectedAnswer={answers[question.id]}
              />
            );
          case 'numerical':
            return (
              <NumberQuestion
                key={question.id}
                question={question}
                handleAnswer={handleAnswer}
                selectedAnswer={answers[question.id]}
              />
            );
          case 'time':
            return (
              <TimeQuestion
                key={question.id}
                question={question}
                handleAnswer={handleAnswer}
                selectedAnswer={answers[question.id]}
              />
            );
          default:
            return
        }
      })}
    </>
  )
}