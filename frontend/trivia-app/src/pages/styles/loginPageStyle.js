import styled from 'styled-components';

export const StyledLoginBackground = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    background: red;
    height: 100vh;
    width: 90vw;
  `

export const StyledLoginDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    background: blue;
    height: 100%;
    width: 70%;
`

export const StyledLoginInputContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    background: white;
    height: 40%;
    width: 80%;
`

export const StyledLoginInput = styled.input`
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;       
`