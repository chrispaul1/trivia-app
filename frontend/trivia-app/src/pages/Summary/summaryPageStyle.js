import styled from "styled-components";

export const StyledSummaryBackground = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    ${({ theme }) => theme.panel.a1};
`

export const StyledSummaryTitle = styled.h2`
    display: flex:
    align-items: center;
    justify-content: center;
    border: solid 1px black;
`

export const StyledSummaryDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding-top: 15px;
    row-gap: 1rem;
    height: 90%;
    width: 80%;
    border-radius: 12px;
    ${({ theme }) => theme.panel.a2};
`

export const StyledSummaryItemDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: black;
    height: ${(props) => props.height ? props.height : 'fit-content'};
    width: ${(props) => props.width ? props.width : "80%"};
    ${({ theme }) => theme.panel.a3};
    padding: 15px 0px 15px 0px;
    border-radius: 12px;
`

export const StyledReviewQuestionContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 15%;
    max-height: 30%;
    width: 80%;
    border-radius: 12px;
    ${({ theme }) => theme.panel.a1};
`

export const StyledSummaryScrollableDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    background: white;
    height: 100%;
    row-gap: 15px;
    padding-top: 20px;
    width: 100%;
    overflow-y: auto;
    ${({ theme }) => theme.panel.a1};
    /* hide page scrollbar */
    html { scrollbar-width: none; } /* Firefox */
    body { -ms-overflow-style: none; } /* IE and Edge */
    body::-webkit-scrollbar, body::-webkit-scrollbar-button { display: none; } /* Chrome */
    /* end hide page scrollbar */
`

export const StyledReviewQuestionBlock = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    justify-content: flex-start;
    ${({ theme }) => theme.panel.a3};
`

export const StyledReviewQuestionDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: black;
    height: ${(props) => props.height ? props.height : 'fit-content'};
    width: ${(props) => props.width ? props.width : "100%"};
    ${({ theme }) => theme.panel.a4};
    padding: 15px 0px 15px 0px;
`

export const StyledButtonDiv = styled.div`
    display: flex;
    justify-content: space-evenly;
    width: 90%;
`

export const StyledSummaryButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 75px;
    width: fit-content;
    ${({ theme }) => theme.primaryButton};

    &: hover{
        pointer: cursor
    }

`