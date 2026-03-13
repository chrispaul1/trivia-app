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
import { useQuizState } from "../context/quizContext"

//function that decodes html entities in the question and answer strings, since the API returns them encoded
function decodeHtmlEntities(encodedString) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(encodedString, 'text/html');
    return doc.documentElement.textContent;
}

export function QuizPage() {
  //const triviaQuestions = location.state?.triviaQuestions || []

  const [triviaQuestions, setTriviaQuestions] = useState([])
  const [processedQuestions, setProcessedQuestions] = useState([])
  const quizState = useQuizState()
  const hasFetched = useRef(false)
  const navigate = useNavigate()

  console.log("quizState", quizState)
  useEffect(() => {
    //decode html entities in the question and answer strings
    const decodedQuestions = triviaQuestions.map(item => ({
      ...item,
      question: decodeHtmlEntities(item.question),
      category: decodeHtmlEntities(item.category),
      correct_answer: decodeHtmlEntities(item.correct_answer),
      incorrect_answers: item.incorrect_answers.map(ans => decodeHtmlEntities(ans))
    }))
    console.log("Shuffling all questions...");
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

  //calls the fetchQuestion funcs and prevents the func being called twice
  useEffect(() => {
    if (hasFetched.current) {
      return
    }
    hasFetched.current = true

    fetchQuestions()
  }, [])

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
      console.log("res", res)
      if (!res.ok) {
        throw new Error("Error, Failed to fetch trivia questions")
      }

      const data = await res.json()
      setTriviaQuestions(data.results)
      //navigate("/quiz", {state:{triviaQuestions: data.results }})
    } catch (error) {
      console.error(error)
      navigate("/")
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
          triviaQuestions={processedQuestions}
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
