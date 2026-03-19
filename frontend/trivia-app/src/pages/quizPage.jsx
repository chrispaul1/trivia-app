import React,{useState, useEffect, useMemo, useCallback, useRef} from "react"
import {
  StyledPaginate,
  StyledQuestionsOutline,
  StyledQuestionsBackground,
} from "."
import { TriviaQuestionsComponent} from "../components"
import { useWindowSize } from "../hooks/SizeHook"
import { useLocation, useNavigate } from "react-router-dom"
import { categoryNames } from "../assets/categories"
import { useQuizState, useQuizDispatch } from "../context/quizContext"

//function that decodes html entities in the question and answer strings, since the API returns them encoded
function decodeHtmlEntities(encodedString) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(encodedString, 'text/html');
    return doc.documentElement.textContent;
}

export function QuizPage() {

  const [triviaQuestions, setTriviaQuestions] = useState([])
  const [processedQuestions, setProcessedQuestions] = useState([])
  const quizState = useQuizState()
  const quizDispatch = useQuizDispatch()
  const hasFetched = useRef(false)
  const navigate = useNavigate()

  console.log("quizState", quizState)

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

  //if the game hasn't started officially, send the user back to the menu
  useEffect(() => {
    if (!quizState.isGameStarted) {
      console.log("game hasnt started, im going back to menu")
      navigate('/', { replace: true });
    } 
  }, [quizState.isGameStarted, navigate])

  useEffect(() => {
    //decode html entities in the question and answer strings
    const decodedQuestions = triviaQuestions.map(item => ({
      ...item,
      question: decodeHtmlEntities(item.question),
      category: decodeHtmlEntities(item.category),
      correct_answer: decodeHtmlEntities(item.correct_answer),
      incorrect_answers: item.incorrect_answers.map(ans => decodeHtmlEntities(ans))
    }))
    const shuffledQuestions = decodedQuestions.map((q) => ({
      ...q,
      shuffledAnswers: q.incorrect_answers.concat(q.correct_answer)
        .sort(() => Math.random() - 0.5),
    }));
    setProcessedQuestions(shuffledQuestions)
  }, [triviaQuestions])

  //pagination states and variables
  //const [itemOffset, setItemOffset] = useState(0);
  //const itemsPerPage = 1;
  //const endOffset = itemOffset + itemsPerPage
  //const pageCount = Math.ceil(processedQuestions.length / itemsPerPage)
  //const size = useWindowSize();  

  //fetches the questions by calling an api endpoint with the settings data
  async function fetchQuestions() {
    let categoryID

    if (quizState.settingsState.category != undefined && quizState.settingsState.category != "" && quizState.settingsState.category.toLowerCase() != "randomized categories") {
      categoryID = categoryNames.trivia_categories.find(cat => cat.name.toLowerCase() === quizState.settingsState.category.toLowerCase()).id
    }

    const apiUrl = `http://localhost:5000/questions?category=${categoryID}&difficulty=${encodeURIComponent(quizState.settingsState.difficulty)}&amount=${quizState.settingsState.amount}&type=${encodeURIComponent(quizState.settingsState.type)}&userid=${quizState.userID}`;

    console.log("Fetching from API URL: ", apiUrl)
    try {
      const res = await fetch(apiUrl)
      if (!res.ok) {
        throw new Error("Failed to fetch questions")
      }
      const data = await res.json()
      quizDispatch({type:"SET_QUESTIONS",payload:data.results})
      setTriviaQuestions(data.results)
    } catch (error) {
      console.error(error)
      alert("Oops! The trivia database is currently unavailable. Please try again.");
      quizDispatch({ type: "END_GAME" });
      navigate("/",{replace:true})
    }
  }

  return (
    <StyledQuestionsBackground>
      {/*Header component here for the title and possible timer*/}
      {/* <Header
      //headerObjs={headerState}
      //disableButton={disableButton}
      /> */}
      <StyledQuestionsOutline>
        <TriviaQuestionsComponent
          triviaQuestions={quizState.triviaQuestions}
          fetchQuestions={fetchQuestions}
          mode={""}
        />
        {/* <StyledPaginate
          //breakLabel="..."
          //previousLabel={size.width > 650 ? "< Previous" : "<"}
          previousLabel={null}
          onPageChange={handlePageClick}
          pageCount={pageCount}
          pageRangeDisplayed={0}
          marginPagesDisplayed={0}
          //nextLabel={size.width > 650 ? "next >" : ">"}
          nextLabel={null}
          renderOnZeroPageCount={null}
        />          */}
      </StyledQuestionsOutline>

    </StyledQuestionsBackground>
  )
}
