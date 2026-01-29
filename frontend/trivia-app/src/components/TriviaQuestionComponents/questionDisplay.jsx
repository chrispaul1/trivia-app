import React, { useState, useEffect } from "react"
import { MultipleChoice, TrueFalse } from "."
export function QuestionDisplay({ currentItems }) {

  function decodeHtmlEntities(encodedString) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(encodedString, 'text/html');
    return doc.documentElement.textContent;
  }

  currentItems = currentItems.map(item => ({
    ...item,
    question: decodeHtmlEntities(item.question),
    category: decodeHtmlEntities(item.category),
    correct_answer: decodeHtmlEntities(item.correct_answer),
    incorrect_answers: item.incorrect_answers.map(ans => decodeHtmlEntities(ans))
  }))

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