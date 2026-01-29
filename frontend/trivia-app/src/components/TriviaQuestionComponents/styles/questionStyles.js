import styled from "styled-components";

export const StyledQuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;                  
  width: 100%;
`

export const StyledQuestionTextDiv = styled.div`
  display: flex:
  font-size: 2em;
  font-weight: bold;
  margin-top: 5px;
  margin-bottom: 20px;
  padding: 5px;  
  border: 2px solid black;
`

export const StyledAnswerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 80%;
`

export const StyledAnswerButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.isSelected ? "lightblue" : "#f0f0f0")};
  border: 2px solid #000;       
  border-radius: 8px;
  padding: 10px 20px;
  margin: 10px;
  font-size: 1em;
  cursor: pointer;
  width: 60%;
  color : black;

  &:hover {
    background-color: #e0e0e0;
  }
  &:active {
    background-color: #d0d0d0;
  } 
`   
