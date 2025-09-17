import React, {useState, useEffect} from "react"
import { 
    StyledParametersBackground,
    StyledParametersOutline } from '.'
import { DropDown } from "../components/DropdownComponent/dropdown"

export function ParametersPage(){
  const [apiUrl,setApiUrl] = useState("")
    
  const categories = ["first","second","third"]
  const difficulty = ["Easy","Medium","Hard"]
  const [answers,setAnswers] = useState({})
  const questions = [
    {id:1,text:"Select your Categories",options:categories},
    {id:2,text:"Select your difficulty",options:difficulty}
  ]
  
  function handleAnswer(questionId,selectedOption){
    setAnswers(prevAnswers =>({
      ...prevAnswers,
      [questionId]:selectedOption
    }));
  };

  return(
    <StyledParametersBackground>
      <StyledParametersOutline>
        {questions.map((question)=>(
          <DropDown
            key={question.id}
            question={question}
            handleAnswer={handleAnswer}
            setAnswers={setAnswers}
          />
        ))}
      </StyledParametersOutline>
    </StyledParametersBackground>
  )
}

/*
import React, { useState, useEffect } from 'react';

function App() {
    const [questions, setQuestions] = useState([]);
    
    useEffect(() => {
        fetch('http://localhost:5000/get_questions')
            .then(response => response.json())
            .then(data => setQuestions(data.results)); // Store trivia questions in state
    }, []);

    return (
        <div>
            <h1>Trivia Quiz</h1>
            {questions.length > 0 && (
                <div>
                    <h2>{questions[0].question}</h2>
                    //{ Render multiple choice answers }
                    {questions[0]?.incorrect_answers.concat(questions[0]?.correct_answer).map((answer, index) => (
                        <button key={index}>{answer}</button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default App;
*/