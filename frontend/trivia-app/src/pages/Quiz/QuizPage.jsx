import React,{useState, useEffect, useMemo, useRef} from "react"
import {
  StyledPaginate,
  StyledQuestionsOutline,
  StyledQuestionsBackground,
} from ".."
import { TriviaQuestionsComponent} from "../../components"
import { useWindowSize } from "../../hooks/SizeHook"
import { useLocation, useNavigate } from "react-router-dom"
import { categoryNames } from "../../assets/categories"
import { useQuizState, useQuizDispatch } from "../../contexts/quiz/quizContext"
import "react-loading-skeleton/dist/skeleton.css";

export function QuizPage() {

  const quizState = useQuizState()
  const quizDispatch = useQuizDispatch()
  const hasFetched = useRef(false)
  const isFetchingRef = useRef(false)
  const navigate = useNavigate()
  const [isLoading,setIsLoading] = useState(true)
 
  //calls the fetchQuestion funcs and prevents the func being called twice
  useEffect(() => {
    if(!quizState.isGameStarted){
      return;
    }

    if (hasFetched.current) {
      return
    }
    hasFetched.current = true

    fetchQuestions()
  }, [quizState.isGameStarted])

  useEffect(()=>{
    //if the userID and username gets removed, go back to the login page
    if (!quizState.userID){
      quizDispatch({ type: "END_GAME"})
      quizDispatch({ type: "RESET_GAME" }); // End the session intentionally
      quizDispatch({ type: "RESET_QUIZ_SETTINGS" })
      navigate('/', { replace: true });
    } 
  },[])

  //if the game hasn't started officially, send the user back to the menu
  useEffect(() => {
    if (!quizState.isGameStarted || !quizState.userID) {
      console.log("game hasnt started, im going back to menu")
      quizDispatch({ type: "RESET_GAME" }); // End the session intentionally
      quizDispatch({type:"RESET_QUIZ_SETTINGS"})
      navigate('/', { replace: true });
    } 

  }, [quizState.isGameStarted, navigate])

  //fetches the questions by calling an api endpoint with the settings data
  async function fetchQuestions( isRefill=false ) {
    
    if (isFetchingRef.current){
      return;
    }

    isFetchingRef.current = true
    
    //Category string cannot be passed to the backend, we have to send back the integer id for category
    let categoryID
    if (quizState.settingsState.category != undefined && quizState.settingsState.category != "" && quizState.settingsState.category.toLowerCase() != "randomized categories") {
      categoryID = categoryNames.trivia_categories.find(cat => cat.name.toLowerCase() === quizState.settingsState.category.toLowerCase()).id
    }

    // If it's endless mode, always fetch the maximum batch size (50) to fill the buffer!
    const fetchAmount = quizState.settingsState.mode.toLowerCase() === 'endless' ? 10 : quizState.settingsState.amount
    
    const apiUrl = `http://localhost:5000/questions?category=${categoryID}&difficulty=${encodeURIComponent(quizState.settingsState.difficulty)}&amount=${fetchAmount}&type=${encodeURIComponent(quizState.settingsState.type)}&userid=${quizState.userID}`;

    try {

      const res = await fetch(apiUrl)
      if (!res.ok) {
        throw new Error("Failed to fetch questions")
      }
      const data = await res.json()
      console.log("isRefill",isRefill)
      if(isRefill){
        console.log("appending questions")
        quizDispatch({type:"APPEND_QUESTIONS",payload:data.results})
      } else {
        quizDispatch({type:"SET_QUESTIONS",payload:data.results})
      }

      setTimeout(()=>{
        setIsLoading(false)
      },1000)

    } catch (error) {

      console.log(error)
      quizDispatch({ type: "RESET_GAME" }); // End the session intentionally
      quizDispatch({ type: "RESET_QUIZ_SETTINGS" })
      quizDispatch({ type: "END_GAME" });
      navigate("/",{replace:true})
      alert("Oops! The trivia database is currently unavailable. Please try again.");

    } finally{
      setTimeout(()=>{
        isFetchingRef.current = false;
      },5000)
    }
  }

  return (
    <StyledQuestionsBackground>
      <StyledQuestionsOutline>
        <TriviaQuestionsComponent
          isLoading={isLoading}
          fetchQuestions={fetchQuestions}
          mode={""}
        /> 
      </StyledQuestionsOutline>

    </StyledQuestionsBackground>
  )
}
