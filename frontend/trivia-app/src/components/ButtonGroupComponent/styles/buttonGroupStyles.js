import styled from "styled-components";
import { CiCircleCheck } from "react-icons/ci";
export const StyledOptionsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: auto;
    padding-top: 10px;
    padding-bottom: 10px;
    width: 90%;
    gap: 10px;
    align-items: center;
`

export const StyledOptionButton = styled.button`
    display: flex;
    height: 10%;
    min-height: 100px;
    width: 100%;
    border-radius: 20px;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    ${({theme}) => theme.panel.a3};
    border: solid 1px ${({ theme }) => theme.panel.a4.backgroundColor};

    &: hover{
        ${({ theme }) => theme.panel.a4};
    }
    
    &: active{
        ${({ theme }) => theme.panel.a5};
        transform: scale(0.98);
    }

`

export const StyledGroupNameText = styled.span`
    display: flex;
    height: 20px;
    width: 100%;
    font-size: 1rem;
    padding-bottom: 10px;
    font-weight: bold; 
`

export const StyledTextGroup = styled.span`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-evenly;
    padding-left: 10%;
    height: 100%;
`

export const StyledPrimaryText = styled.span`
    font-weight: bold;
`

export const StyledSecondaryText = styled.span`
    font-size: 0.8rem;
    opacity: 0.7;
`

export const StyledSelectedIcon = styled(CiCircleCheck)`
    font-size: 24px;
    margin-left: auto;
    color: ${({ $chosen, theme }) => $chosen ? theme.primaryButton.backgroundColor : 'inherit'};
`