import React, {useState, useEffect, use} from "react"
import { 
    StyledParametersBackground,
    StyledParametersOutline } from '.'
import { Form,Header } from "../components"
import { questions, initialAnswerState } from "../assets/questions"
export function ParametersPage({setQuestions}){

  const headerState = [
    {
      id:1,
      placement:"middle",
      type:"title",
      text:"Placeholder Text"
    },
    {
      id:1,
      placement:"right",
      type:"button",
      text:"Start",
      function:FetchQuestions,
    }
  ]

  //state array for the answers
  const [answers,setAnswers] = useState(initialAnswerState)
  const [disableButton,setDisableButton] = useState(false)
  const reqCount = questions.filter(q => q.required).length
  const reqID = questions.filter(q => q.required == true).map(item => item.id)

  useEffect(()=>{
    let ansCount = reqID.filter(id => answers[id] !== '' && answers[id] != undefined && answers[id] != 0).length
    if(ansCount == reqCount){
      setDisableButton(false)
    }else{
      setDisableButton(true)
    }
  },[])

  //function to handle the user answers, based on the question id, it changes the answer
  function HandleAnswer(questionId, newValue){
    setAnswers(prevAnswers =>{
      //Check if the answer already exists for the question
      const exists = prevAnswers.find(answer => answer.id === questionId);
      if (exists) {
        //if the new value is same as the exisitng value, remove it from the answers
        if (exists.value == newValue){
          let initialAnswer = initialAnswerState.find(ans => ans.id === questionId).value
          return prevAnswers.map((answer) => answer.id === questionId ? { ...answer, value: initialAnswer } : answer);
        }
        //if its not, update the answers state with the new value
        return prevAnswers.map(answer =>
          answer.id === questionId ? {...answer, value: newValue} : answer
        )
      }
      return [...prevAnswers, {id: questionId, value: newValue}];
    })
  }

  useEffect(()=>{
    console.log(answers)
  },[answers])

  //This handles creating the api url sent to the backend to retireve the data
  async function FetchQuestions(){
    console.log("Fetching Questions with answers :")
    let categoryID
    if(answers.category){
      const found = categoryNames.trivia_categories
                          .filter(obj => obj.name == answers.category).map(item => item.id)
      categoryID = found.length ? found[0] : ""
    }

     const apiUrl = `http://localhost:5000/get_questions?category=${categoryID}&difficulty=${encodeURIComponent(answers.difficulty)}&amount=${answers.questionCount}&type=${encodeURIComponent(answers.questionType)}`;
     fetch(apiUrl)
          .then((res) => res.json())
          .then((data) => setQuestions(data))
  }

  return(
    <StyledParametersBackground>
      <Header
        headerObjs={headerState}
        disableButton={disableButton}
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