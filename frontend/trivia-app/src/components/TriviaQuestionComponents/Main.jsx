import React, { useState, useEffect } from "react"
import { MultipleChoice, TrueFalse } from "."
export function TriviaQuestionsComponent({ 
  currentQuestions, 
  questionNumber ,
  setItemOffset
}) {

  return ( 
    <>
      {currentQuestions && 
        currentQuestions.map((questionObj, index) => {
            switch(questionObj.type) {
              case "multiple":
                return(
                  <MultipleChoice 
                    key={questionObj.id} 
                    questionObj={questionObj}
                    setItemOffset={setItemOffset}
                    questionNumber={questionNumber}
                  />
                ) 
              case "boolean":
                return(
                  <TrueFalse 
                    key={questionObj.id} 
                    questionObj={questionObj} 
                    setItemOffset={setItemOffset}
                    questionNumber={questionNumber}
                  />
                ) 
              default:
            }
          })
      }
    </>
  )
}