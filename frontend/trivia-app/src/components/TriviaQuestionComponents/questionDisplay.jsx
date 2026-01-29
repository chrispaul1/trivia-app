import React, { useState, useEffect } from "react"
import { MultipleChoice, TrueFalse } from "."
export function QuestionDisplay({ currentItems }) {

  return ( 
    <>
      {currentItems && 
          currentItems.map((questionObj, index) => {
            switch(questionObj.type) {
              case "multiple":
                return(
                  <MultipleChoice 
                    key={index} 
                    questionObj={questionObj} 
                  />
                ) 
              case "boolean":
                return(
                  <TrueFalse 
                    key={index} 
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