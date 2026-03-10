import React, {useState, useEffect, use} from "react"
import { 
    StyledParametersBackground,
    StyledParametersOutline } from '.'
import { Form,Header } from "../components"
import { questions, initialAnswerState } from "../assets/questions"
import { categoryNames } from "../assets/categories"
import { useNavigate } from "react-router-dom"
import { useQuizState, useQuizDispatch } from "../context/quizContext"

export function SettingsPage(){

  //state array for the answers
  const [answers, setAnswers] = useState(initialAnswerState)
  const [disableButton, setDisableButton] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const quizState = useQuizState()
  const quizDispatch = useQuizDispatch()
  const navigate = useNavigate()

  const headerState = [
    {
      id:1,
      placement:"middle",
      type:"title",
      text:"Settings"
    },
    {
      id:1,
      placement:"right",
      type:"button",
      text:"Start Game",
      function:FetchQuestions,
    }
  ]

  useEffect(()=>{
    console.log("State answers from context:", quizState)
  }, [quizState]) 

  //get the number of required questions and their IDs
  const reqCount = questions.filter(q => q.required).length
  const reqID = questions.filter(q => q.required == true).map(item => item.id)

  //handle disabling the start button until all required questions are answered
  useEffect(()=>{
    let ansCount = 0
    //console.log("answers state changed:", answers)
    reqID.forEach((id)=>{
      var value = answers[id]
      //console.log("id:",id,"value:",value)
      if (value !== "" && value !== undefined && value != 0 && value != [0,0] && value !== null){
        ansCount += 1
      }
      else{
        ansCount -= 1
      }
    })
    if (ansCount < 0) { 
      ansCount = 0 
    }
    if(ansCount == reqCount){
      setDisableButton(false)
    }else{
      setDisableButton(true)
    }
  },[answers])

  //function to handle the user answers, based on the question id, it changes the answer
  function HandleSettingsAnswer(id, value){
    console.log("id :",id,"value:",value)
    quizDispatch({
      type:"SET_PARAMETERS",
      payload: {"id":id,"value":value}
    })

    setAnswers(prevAnswers =>{
      if (prevAnswers[id] == value){
        console.log(prevAnswers[id],"==",value)
        return {...prevAnswers, [id]: initialAnswerState[id]}
      } 
      return {...prevAnswers, [id]: value}
      /*
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
      */
    })
  }

  //This handles creating the api url sent to the backend to retireve the data
  async function FetchQuestions(){
    setIsLoading(true)
    let categoryID
    if(answers["category"] != undefined && answers["category"] != "" && answers["category"].toLowerCase() != "randomized categories"){
      //console.log("Category selected:", answers["category"]) 
      categoryID = categoryNames.trivia_categories.find(cat => cat.name.toLowerCase() === answers["category"].toLowerCase()).id
    }
    const apiUrl = `http://localhost:5000/get_questions?category=${categoryID}&difficulty=${encodeURIComponent(answers["difficulty"])}&amount=${answers["questionCount"]}&type=${encodeURIComponent(answers["questionType"])}&userid=${quizState.userID}`;
    //console.log("Answers state before fetch:", answers)
    console.log("Fetching from API URL: ", apiUrl)
    try{
      const res = await fetch(apiUrl)
      
      if(!res.ok){
        throw new Error("Error, Failed to fetch trivia questions")
      }

      const data = await res.json()
      // if (data.NewToken){
      //   localStorage.setItem("triviaToken", data.NewToken)
      // } 

      setTriviaQuestions(data.results)
      navigate("/quiz", {state:{triviaQuestions: data.results }})
    } catch (error){
      //console.error("Fetch error:", error)
    } finally{
      setIsLoading(false)
    }
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
          handleAnswer={HandleSettingsAnswer}
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


// useEffect(() => {

//   //Switching to calling it from the backend, backend will also handle if the token is expired or used up

//   //fetch a new token from the opentdb api to ensure we get unique questions for the quiz, and store it in state
//   const fetchToken = async () => {
//     const savedToken = localStorage.getItem("triviaToken")
//     if (!savedToken) {
//       try {
//         const res = await fetch("https://opentdb.com/api_token.php?command=request")
//         const data = await res.json()
//         setToken(data.token)
//         localStorage.setItem("triviaToken", data.token);
//       } catch (error) {
//         console.error("Error fetching token:", error)
//       }
//     } else {
//       setToken(savedToken)
//     }
//   }
//   fetchToken()
// }, []);