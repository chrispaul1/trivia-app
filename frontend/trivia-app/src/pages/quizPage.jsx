import React,{useState, useEffect, useMemo, useCallback} from "react"
import {
  StyledPaginate,
  StyledQuestionsOutline,
  StyledQuestionsBackground,
} from "."
import { TriviaQuestionsComponent} from "../components"
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
  console.log(triviaQuestions)
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
    console.log(newOffset)
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
        <TriviaQuestionsComponent
          currentQuestions={currentQuestions}
          //setScoreCounter={setScoreCounter}
          questionNumber={itemOffset+1}
          setItemOffset={setItemOffset}
        />
        <StyledPaginate
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
        />         
      </StyledQuestionsOutline>

    </StyledQuestionsBackground>
  )
}
