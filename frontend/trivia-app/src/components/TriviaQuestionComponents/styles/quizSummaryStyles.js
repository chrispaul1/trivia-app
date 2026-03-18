import styled from "styled-components";

export const StyledSummaryBackground = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    height: 100%;
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
    row-gap: 1rem;
    background: lightblue;
    height: 90%;ssss
    width: 90%;
    border: solid 1px black;
`

export const StyledSummaryItemDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: ${(props) => props.height ? props.height : 'fit-content'};
    width: ${(props) => props.width ? props.width : "90%"};
    padding: 15px 0px 15px 0px;
    //border: solid 1px black;
`

export const StyledSummaryScrollableDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    background: white;
    height: 20%;
    row-gap: 15px;
    padding-top: 20px;
    max-height: 200px;
    width: 90%;
    overflow-y: auto;
`

export const StyledReviewQuestionBlock = styled.div`
    display: flex;
    background: lightseagreen;
    flex-direction: column;
    width: 100%;
    align-items: center;
    justify-content: flex-start;
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

    &: hover{
        pointer: cursor
    }

`