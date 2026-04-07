import styled from "styled-components";

export const StyledTriviaBackground = styled.div`
  display: flex;
  flex-direction: column;
  background: orange;
  width: 100%;
  height: 100%;
`

export const StyledQuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  //background: lightgreen;
  justify-content: center;                  
  width: 100%;
  height: 25%;
  max-height: 25%;
  //border: solid 1px red;
`


export const StyledQuestionTextDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;    
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 5px;
  margin-bottom: 20px;
  min-width: 60%;
  max-width: 90%;
  padding: 5px;  
  border: solid 1px black;

  span {
    width: 100%;
  }
  `
  export const StyledTimerContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 25%;
    width: 100%;
    min-height: 25%;
    max-width: 100%;
    //border: solid 1px black;

    span {
      width: 60%;
    }
  `

export const StyledAnswerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50%;
  row-gap: 5px;

  span {
    width: 100%;
  }
`

export const StyledAnswerButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: lightblue;
  border: 2px solid #000;       
  border-radius: 8px;
  padding: 10px 20px;
  margin: 10px;
  font-size: 1em;
  cursor: pointer;
  width: 60%;
  color : black;

  &:active {
    background-color: #d0d0d0;
  } 

  ${(props)=>props.$status === 'correct' && `
    background-color: #4CAF50; /* Green */
    color: white;
    border-color: #4CAF50;
  `}

  ${(props) => props.$status === 'incorrect' && `
    background-color: #F44336; /* Green */
    color: white;
    border-color: #F44336;
  `}

  ${(props) => props.$status === 'unselected' && `
    opacity: 0.5;
    background-color: #e0e0e0;
  `}

  &:hover {
    ${(props) => props.$status === 'default' && `
      background-color: #e0e0e0;
    `}
  }


`   
