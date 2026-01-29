import React,{useState, useEffect} from "react"
import {
  StyledPaginate,
  StyledQuestionsOutline,
  StyledQuestionsBackground,
} from "."
import { QuestionDisplay} from "../components"
import { useWindowSize } from "../hooks/SizeHook"
import { use } from "react";
 
export function QuizPage({ triviaQuestions }) {

  const [scoreCounter,setScoreCounter] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 1;
  const endOffset = itemOffset + itemsPerPage
  const currentItems = triviaQuestions.slice(itemOffset, endOffset)
  const pageCount = Math.ceil(triviaQuestions.length/itemsPerPage)
  const size = useWindowSize();

  const handlePageClick = (event) =>{
    const newOffset = (event.selected * itemsPerPage) % triviaQuestions.length
    setItemOffset(newOffset)
  }

  useEffect(()=>{
    console.log("window size changed:", size.width, size.height )
  },[size.width])

  return (
    <StyledQuestionsBackground>
      //Header component here for the title and possible timer
      {/* <Header
      //headerObjs={headerState}
      //disableButton={disableButton}
      /> */}
      <StyledQuestionsOutline>
        <QuestionDisplay
          currentItems={currentItems}
          setScoreCounter={setScoreCounter}
        />
      <StyledPaginate
        breakLabel="..."
        nextLabel={size.width > 500 ? "next >" : ">"}
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
          previousLabel={size.width > 500 ? "< Previous" : "<"}
        renderOnZeroPageCount={null}
      />         
      </StyledQuestionsOutline>

    </StyledQuestionsBackground>
  )
}