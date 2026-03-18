import React,{useState,useEffect} from "react"
import { 
  StyledAnswerButton, 
  StyledQuestionTextDiv,
  StyledAnswerContainer,
  StyledQuestionContainer, 
} from "./styles"
import { useQuizDispatch } from "../../context/quizContext";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

export function TrueFalse({ questionObj, setItemOffset, questionNumber, handleAnswerScoring }) {
  
  const quizDispatch = useQuizDispatch()
  const [selectedAnswer,setSelectedAnswer] = useState(null)
  const [isDisabled, setIsDisabled] = useState(false);
  
  function handleAnswerClick(selectedAnswer) {
    const isCorrect = selectedAnswer === questionObj.correct_answer
    setSelectedAnswer(selectedAnswer)
    setIsDisabled(true)
    handleAnswerScoring(selectedAnswer, questionObj.correct_answer, questionObj.difficulty)
  }

  const renderTime = ({ remainingTime }) => {

    if (selectedAnswer != null) {
      return <div className="timer">Moving onto Next Question...</div>;
    }

    if (remainingTime === 0) {
      return <div className="timer">Too late...</div>;
    }

    return (
      <div className="timer">
        <div className="text">Remaining</div>
        <div className="value">{remainingTime}</div>
        <div className="text">seconds</div>
      </div>
    );
  };
  
  return (
    <StyledQuestionContainer>
      <h2>
        {questionObj.category}
      </h2>
      <StyledQuestionTextDiv>
        {questionNumber}.{" "}{questionObj.question}
      </StyledQuestionTextDiv>
        <CountdownCircleTimer
          key={questionNumber}
          isPlaying={selectedAnswer ? false : true}
          duration={10}
          colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
          colorsTime={[10, 6, 3, 0]}
          onComplete={() => (selectedAnswer == null && setItemOffset(prev => prev+1))}
        >
          {renderTime}
        </CountdownCircleTimer>     
      <StyledAnswerContainer>
        {["True","False"].map((answerOption, index) => {
          let buttonStatus = "default"
          if(selectedAnswer !== null){
            const isTheAnswerCorrect = answerOption === questionObj.correct_answer
            const didUserClickThisOption = answerOption === selectedAnswer
            if (isTheAnswerCorrect){
              buttonStatus="correct"
            } 
            else if (didUserClickThisOption){
              buttonStatus="incorrect"
            }
            else{
              buttonStatus="unselected"
            }
          }
          return(
            <StyledAnswerButton 
              key={answerOption}
              onClick={() => handleAnswerClick(answerOption)}
              $status={buttonStatus}
              disabled={isDisabled}
            >
              {answerOption}
            </StyledAnswerButton>
          )
        })}
      </StyledAnswerContainer>
    </StyledQuestionContainer>
  )
}