import React, { useState, useEffect } from "react"
import { MultipleChoice, TrueFalse } from "."
export function QuestionDisplay({ currentQuestions }) {

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
                  />
                ) 
              case "boolean":
                return(
                  <TrueFalse 
                    key={questionObj.id} 
                    questionObj={questionObj} 
                  />
                ) 
              default:
            }
          })
      }
    </>
  )
}