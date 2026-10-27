import styled from 'styled-components';

export const StyledLoginBackground = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    height: 100vh;
    width: 100vw;
    ${({ theme }) => theme.panel.a1};
  `

export const StyledLoginDiv = styled.div`
    display: flex;
    flex-direction: column;   
    justify-content: start;
    align-items: center;
    height: 100%;
    width: 90%;
    min-width: 400px;
`

export const StyledLoginTitle = styled.h2`
    display: flex;
    height: 10%;
    width: 90%;
    min-height: 75px;
    font-size: 2.5rem;
    align-items: center;
    justify-content: center;
    ${({ theme }) => theme.panel.a3};
    border: solid 1px ${({ theme }) => theme.panel.a4.backgroundColor};
    //border: solid 2px red;
    border-radius: 16px;
`
export const StyledLoginWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 100%;
    width: 100%;
    border: solid 1px white;
`
export const StyledInfoContainer = styled.div`
    dispaly: flex;
    flex-direction: column;
    height: 90%;
    width: 45%;
    border: solid 1px red;
    border-radius: 20px;
`

export const StyledLoginInputContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding-top: 10vh;
    gap: 10vh;
    align-items: center;
    height: 80%;
    max-width: 600px;
    width: 65%;
    ${({theme}) => theme.panel.a2};
    border: solid 1px ${({theme}) => theme.panel.a3.backgroundColor};
    border-radius: 24px;
`

export const StyledUserNameInputDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
    flex-wrap: wrap;
    gap: 10px;
`

export const StyledLoginInput = styled.input`
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px; 
    width: 70%;
    ${({ theme }) => theme.panel.a4};
    border: solid 1px ${({ theme }) => theme.panel.a5.backgroundColor};
    border-radius: 16px;
`

export const StyledButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 250px;
    min-height: 40px;
    width: 70%;
    font-size: calc(.75rem + 1vw);
    ${({theme}) => theme.primaryButton};

    &: hover{
        pointer: cursor
    }
`