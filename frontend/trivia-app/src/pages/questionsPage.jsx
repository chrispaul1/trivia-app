import React,{useState, useEffect} from "react"
import {
  StyledPaginate,
  StyledQuestionsOutline,
  StyledQuestionsBackground,
} from "."
import { QuestionDisplay} from "../components"
 
export function QuestionsPage({ triviaQuestions }) {

  const [scoreCounter,setScoreCounter] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 1;
  console.log("triviaQuestions in QuestionsPage:", triviaQuestions)
  const endOffset = itemOffset + itemsPerPage
  const currentItems = triviaQuestions.slice(itemOffset, endOffset)
  const pageCount = Math.ceil(triviaQuestions.length/itemsPerPage)

  const handlePageClick = (event) =>{
    const newOffset = (event.selected * itemsPerPage) % triviaQuestions.length
    setItemOffset(newOffset)
  }

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
      </StyledQuestionsOutline>
      <StyledPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />         

    </StyledQuestionsBackground>
  )
}