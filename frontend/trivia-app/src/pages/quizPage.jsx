import React,{useState, useEffect, useMemo, useCallback} from "react"
import {
  StyledPaginate,
  StyledQuestionsOutline,
  StyledQuestionsBackground,
} from "."
import { QuestionDisplay} from "../components"
import { useWindowSize } from "../hooks/SizeHook"
import { useLocation } from "react-router-dom"

//function that decodes html entities in the question and answer strings, since the API returns them encoded
function decodeHtmlEntities(encodedString) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(encodedString, 'text/html');
    return doc.documentElement.textContent;
}

export function QuizPage() {
  const location = useLocation()

  const triviaQuestions = location.state?.triviaQuestions || []

  const [processedQuestions, setProcessedQuestions] = useState([])

  useEffect(()=>{
    //decode html entities in the question and answer strings
    const decodedQuestions = triviaQuestions.map(item => ({
      ...item,
      question: decodeHtmlEntities(item.question),
      category: decodeHtmlEntities(item.category),
      correct_answer: decodeHtmlEntities(item.correct_answer),
      incorrect_answers: item.incorrect_answers.map(ans => decodeHtmlEntities(ans))
    }))
    console.log("Shuffling all questions...");
    const shuffledQuestions = decodedQuestions.map((q) =>({
      ...q,
      shuffledAnswers: q.incorrect_answers.concat(q.correct_answer)
      .sort(() => Math.random() - 0.5),
    }));
    setProcessedQuestions(shuffledQuestions)
  },[triviaQuestions])

  const [scoreCounter,setScoreCounter] = useState(0);
  //pagination states and variables
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 1;
  const endOffset = itemOffset + itemsPerPage
  const pageCount = Math.ceil(processedQuestions.length/itemsPerPage)
  const currentQuestions = processedQuestions.slice(itemOffset, endOffset)

  const size = useWindowSize();  
  
  //function that handles page changes in the pagination component
  const handlePageClick = useCallback((event) =>{
    const newOffset = (event.selected * itemsPerPage) % processedQuestions.length
    setItemOffset(newOffset)
  },[itemsPerPage, processedQuestions.length])

  return (
    <StyledQuestionsBackground>
      //Header component here for the title and possible timer
      {/* <Header
      //headerObjs={headerState}
      //disableButton={disableButton}
      /> */}
      <StyledQuestionsOutline>
        <QuestionDisplay
          currentQuestions={currentQuestions}
          setScoreCounter={setScoreCounter}
        />
        <StyledPaginate
          breakLabel="..."
          nextLabel={size.width > 600 ? "next >" : ">"}
          onPageChange={handlePageClick}
          pageRangeDisplayed={1}
          pageCount={pageCount}
          previousLabel={size.width > 600 ? "< Previous" : "<"}
          renderOnZeroPageCount={null}
        />         
      </StyledQuestionsOutline>

    </StyledQuestionsBackground>
  )
}
