import styled from "styled-components";

export const StyledMenuBackground = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    background: red;
    height: 100vh;
    width: 100%;
`

export const StyledMenuContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding-top: 10vh;
    gap: 10vh;
    align-items: center;
    height: 100%;
    width: 100%;
    ${({theme}) => theme.panel.a2};

`