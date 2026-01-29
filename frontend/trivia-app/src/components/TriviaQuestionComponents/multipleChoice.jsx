import React,{useState,useEffect} from "react"
import { 
  StyledAnswerButton, 
  StyledQuestionTextDiv,
  StyledAnswerContainer,
  StyledQuestionContainer, 
} from "./styles"
export function MultipleChoice({questionObj}) {

  const [answerOptions, setAnswerOptions] = useState([])
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  
  let optionArr = questionObj.incorrect_answers.concat(questionObj.correct_answer)
  optionArr = optionArr.sort(() => Math.random() - 0.5)
  
  return (
    <StyledQuestionContainer>
      <h2>
        Category : {questionObj.category}
      </h2>
      <StyledQuestionTextDiv>
        {questionObj.question}
      </StyledQuestionTextDiv>
      <StyledAnswerContainer>
        {optionArr.map((answerOption, index) => (
          <StyledAnswerButton 
            key={index}
            onClick={() => setSelectedAnswer(answerOption)}
            isSelected={selectedAnswer === answerOption ? true : false}
          >
            {answerOption}
          </StyledAnswerButton>
        ))}
      </StyledAnswerContainer>
    </StyledQuestionContainer>
  )
}