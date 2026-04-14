import styled from 'styled-components';

export const StyledLoginBackground = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    height: 100vh;
    width: 100vw;
  `

export const StyledLoginDiv = styled.div`
    display: flex;
    flex-direction: column;   
    justify-content: start;
    align-items: center;
    height: 100%;
    width: 100%;
    ${({theme}) => theme.panel.a1};
    
`

export const StyledLoginInputContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    height: 40%;
    width: 100%;
    ${({theme}) => theme.panel.a2};
`

export const StyledUserNameDiv = styled.div`
    display: flex;
    
`

export const StyledLoginInput = styled.input`
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;       
`

export const StyledButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    min-width:250px;
    width: fit-content;
    ${({theme}) => theme.primaryButton};

    &: hover{
        pointer: cursor
    }
`