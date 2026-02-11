import React,{useState,useEffect,useMemo} from "react"
import { 
  StyledAnswerButton, 
  StyledQuestionTextDiv,
  StyledAnswerContainer,
  StyledQuestionContainer, 
} from "./styles"
export function MultipleChoice({questionObj}) {

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  return (
    <StyledQuestionContainer>
      <h2>
        Category : {questionObj.category}
      </h2>
      <StyledQuestionTextDiv>
        {questionObj.question}
      </StyledQuestionTextDiv>
      <StyledAnswerContainer>
        {questionObj.shuffledAnswers.map((answerOption, index) => (
          <StyledAnswerButton 
            key={answerOption}
            onClick={() => setSelectedAnswer(answerOption)}
            $isselected={selectedAnswer === answerOption}
          >
            {answerOption}
          </StyledAnswerButton>
        ))}
      </StyledAnswerContainer>
    </StyledQuestionContainer>
  )
}