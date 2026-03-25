import React, {useState, useEffect, use} from "react"
import { 
    StyledParametersBackground,
    StyledParametersOutline } from '.'
import { Form,Header } from "../../components"
import { questions } from "../../assets/questions"
import { useNavigate } from "react-router-dom"
import { useQuizState, useQuizDispatch } from "../../contexts/quiz/quizContext"

export function SettingsPage(){

  //state array for the answers
  const [disableButton, setDisableButton] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const quizState = useQuizState()
  const quizDispatch = useQuizDispatch()
  const navigate = useNavigate()

  useEffect(()=>{
    quizDispatch({type:"END_GAME"})
  },[])

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
      function:handleStartQuiz,
    }
  ]

  //quiz settings buffer state
  const [bufferSettings,setBufferSettings] = useState({
    category: quizState.settingsState.category || '',
    difficulty: quizState.settingsState.difficulty || 'medium',
    type: quizState.settingsState.type || "",
    amount: quizState.settingsState.amount || 10,
    mode: quizState.settingsState.mode || 'standard'
  })

  useEffect(()=>{
    console.log("State answers from context:", quizState)
    console.log(quizState.settingsState.category)
  }, [quizState]) 

  //function to handle the user answers, based on the question id, it changes the answer
  function handleSettingsAnswer(id, value){
    setBufferSettings(prev =>({
      ...prev,
      [id]:value
    }))
  }

  //handles starting the quiz, by dispatching the quiz settings to the reducer
  //and call the fetchQuestions func to retrieve the trivia question and navigate to the quiz
  function handleStartQuiz(){
    if (!bufferSettings.amount || bufferSettings.amount < 1){
      alert("Please enter how many questions you want to play!");
      return;
    }

    if (!bufferSettings.amount > 50) {
      alert("The maximum number of questions per game is 50");
      return;
    }

    quizDispatch({type:"SET_QUIZ_SETTINGS",payload:bufferSettings})
    quizDispatch({type:"RESET_GAME"})
    quizDispatch({type:"START_GAME"})
    navigate("/quiz")
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
          handleAnswer={handleSettingsAnswer}
          answers={quizState.settingsState}
        />
      </StyledParametersOutline>
    </StyledParametersBackground>
  )
}

// //This handles creating the api url sent to the backend to retireve the data
// async function fetchQuestions() {
//   setIsLoading(true)
//   let categoryID

//   if (quizState.settingsState.category != undefined && quizState.settingsState.category != "" && quizState.settingsState.category.toLowerCase() != "randomized categories") {
//     categoryID = categoryNames.trivia_categories.find(cat => cat.name.toLowerCase() === quizState.settingsState.category.toLowerCase()).id
//   }

//   const apiUrl = `http://localhost:5000/questions?category=${categoryID}&difficulty=${encodeURIComponent(quizState.settingsState.difficulty)}&amount=${quizState.settingsState.amount}&type=${encodeURIComponent(quizState.settingsState.type)}&userid=${quizState.userID}`;

//   console.log("Fetching from API URL: ", apiUrl)
//   try {
//     const res = await fetch(apiUrl)

//     if (!res.ok) {
//       throw new Error("Error, Failed to fetch trivia questions")
//     }

//     const data = await res.json()

//     navigate("/quiz", { state: { triviaQuestions: data.results } })
//   } catch (error) {
//     console.error("Error, could not fetch the questions:", error)
//   } finally {
//     setIsLoading(false)
//   }
// }