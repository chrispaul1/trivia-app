import React, {useState, useEffect} from "react"
import { 
    StyledParametersBackground,
    StyledParametersOutline } from '.'
import { Form,Header } from "../components"
import { categoryNames } from "../assets/categories"

export function ParametersPage({setQuestions}){

  //Initial Answers state for the form
  const initialAnswerState = {
    category:"",
    difficulty:"",
    questionCount:0,
    questionType:"",
    timeLimit:[0,0]
  }

  const headerState = [
    {
      placement:"middle",
      type:"title",
      text:"Placeholder Text"
    },
    {
      placement:"right",
      type:"button",
      text:"Start",
      function:"",
    }
  ]

  //setting the categories
  const categories = categoryNames.trivia_categories.map(obj => obj.name)
  //diffculty options
  const difficulty = ["Any Difficulty","Easy","Medium","Hard"]
  //question type
  const questionType = ["Any Type","Multiple Choice","True/False"]
  //state array for the answers
  const [answers,setAnswers] = useState(initialAnswerState)

  //questions array objets
  const questions = [
    {id:"category",type:'dropdown',text:"Select your Categories",options:categories},
    {id:"difficulty",type:'dropdown',text:"Select your difficulty",options:difficulty},
    {id:"questionCount",type:"number",limit:50,text:"Choose the Number of Questions"},
    {id:"questionType",type:"dropdown",text:"Select the question type",option:questionType},
    {id:"timeLimit",type:"time",text:"Set the time limit"}
  ]

  //function to handle the user answers, based on the question id, it changes the answer
  function HandleAnswer(questionId,selectedOption){
    if(answers[questionId] == selectedOption){
      setAnswers(prevAnswers =>({
        ...prevAnswers,
        [questionId]: ''
      }));      
    }
    else{
      setAnswers(prevAnswers =>({
        ...prevAnswers,
        [questionId]:selectedOption
      }));
    }
  };

  //This handles creating the api url sent to the backend to retireve the data
  async function FetchQuestions(){
    var categoryID
    if(answers.category){
      categoryID = categoryNames.trivia_categories
                          .filter(obj => obj.name == answers.category).map(item => item.id)
    }

     const apiUrl = `http://localhost:5000/get_questions?category=${categoryID}&difficulty=${answers.difficulty}&amount=${answers.questionCount}&type=${answers.questionType}`;
     fetch(apiUrl)
          .then((res) => res.json())
          .then((data) => setQuestions(data))
  }

  useEffect(()=>{
    console.log("Questions :",questions)
  },[questions])

  return(
    <StyledParametersBackground>
      <Header
        headerObjs={headerState}
      />
      <StyledParametersOutline>
        <Form
          questions={questions}
          handleAnswer={HandleAnswer}
          answers={answers}
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