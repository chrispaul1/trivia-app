import styled from "styled-components";

export const StyledTriviaBackground = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  ${({theme}) => theme.glass.a1};
`

export const StyledQuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;                  
  width: 100%;
  height: 25%;
  max-height: 25%;
`

export const StyledQuestionTextDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;    
  font-size: calc(.75rem + 1vh);
  font-weight: bold;
  margin-top: 5px;
  margin-bottom: 20px;
  min-width: 60%;
  max-width: 90%;
  padding: 5px;  
  ${({theme}) => theme.glass.a2};
  border-radius: 10px;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.3);

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
  width: 80%;
  height: 50%;
  row-gap: 5px;
  border-radius: 12px;
  ${({ theme }) => theme.panel.a2};

  span {
    width: 100%;
  }
`

export const StyledAnswerButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #000;       
  border-radius: 8px;
  padding: 20px 20px;
  margin: 10px;
  font-size: calc(.5rem + 1vh);
  cursor: pointer;
  width: 60%;


  ${({ theme }) => theme.panel.a3};

  &:active {
    background-color: ${({ theme }) => theme.baseColor};
  } 

  ${({ $status}) => $status === 'correct' && `
    background-color: #4CAF50; /* Green */
    color: white;
    border-color: #4CAF50;
  `}

  ${({ $status }) => $status === 'incorrect' && `
    background-color: #F44336; /* Red */
    color: white;
    border-color: #F44336;
  `}

  ${({ $status, theme }) => $status === 'unselected' && `
    opacity: 0.5;
    background-color: ${theme.baseColor};
  `}

  &:hover {
    ${({ $status, theme }) => $status === 'default' && `
      background-color: ${theme.panel.a4.backgroundColor};
    `}
  }
`   
