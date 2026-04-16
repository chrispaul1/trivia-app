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
    width: 80%;
`

export const StyledLoginTitle = styled.h2`
    display: flex;
    height: 10%;
    width: 100%;
    font-size: 2.5rem;
    align-items: center;
    justify-content: center;
    ${({ theme }) => theme.panel.a2};
    border-radius: 12px;
`

export const StyledLoginInputContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding-top: 10vh;
    gap: 10vh;
    align-items: center;
    height: 100%;
    width: 100%;
    ${({theme}) => theme.panel.a2};
    border-radius: 12px;
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
    ${({ theme }) => theme.glass.a4};
`

export const StyledButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    min-width:2 50px;
    width: 70%;
    ${({theme}) => theme.primaryButton};

    &: hover{
        pointer: cursor
    }
`