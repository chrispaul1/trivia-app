import styled from "styled-components";
import ReactPaginate from "react-paginate";
export const StyledQuestionsBackground = styled.div` 
    display: flex; 
    flex-direction: column; 
    justify-content: start;     
    align-items: center;
    background: white;
    height: 100vh; 
    width: 95vw; 
`
export const StyledPaginate = styled(ReactPaginate)`
  display: flex;
  list-style: none;
  justify-content: center;
  padding: 0;
  margin-top: auto;

  li {
    margin: 0 2px;
    cursor: pointer;
  }

  a {
    padding: 6px 10px;
    border: 1px solid #ddd;
    background-color: #f9f9f9;
    color: #333;
    border-radius: 4px;
    text-decoration: none;

    &:hover {
      background-color: #eee;
    }
  }

  li.active a {
    background-color: #007bff;
    color: white;
    border-color: #007bff;
  }

  li.disabled a {
    color: #ccc;
    cursor: not-allowed;
    background-color: #f9f9f9;
    border-color: #ddd;
  }

  li.break a {
    cursor: default;
    background-color: transparent;
    border: none;
  }
`;

export const StyledQuestionScoreContainer = styled.div` 
    display: flex; 
    flex-direction: column;
    justify-content: center;     
    align-items: center;
    background: lightgray;
    height: 90vh; 
    width: 20vw; 
    margin-right: 2vw;
`

export const StyledQuestionsOutline = styled.div` 
    display: flex; 
    flex-direction: column;
    background: lightblue;
    align-items: center; 
    height: 90%; 
    width: 100%; 
    color: black; 
`

export const StyledQuestionTimerContainer = styled.div`

`