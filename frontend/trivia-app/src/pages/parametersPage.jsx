import React, {useState, useEffect} from "react"
import { 
    StyledParametersBackground,
    StyledParametersOutline } from '.'
import { DropDown } from "../components/DropdownComponent/dropdown"

export function ParametersPage(){
  const [questions,setQuestions] = useState([])
  const [apiUrl,setApiUrl] = useState("")
    
  const paraQuestions = [
    {text:"Select your Categories"},
    {text:"Select your diffculty"},
    {text:"Choose the number of Questions"},
    {text:"Set your time limit per question"}]
    
  const items = ["first","second","third"]

  return(
    <StyledParametersBackground>
      <StyledParametersOutline>
        <DropDown
          text={"Dropdown Button"}
          content={items}
        />
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