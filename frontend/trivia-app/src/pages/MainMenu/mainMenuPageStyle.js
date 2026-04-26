import styled from "styled-components";

export const StyledMenuBackground = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
    ${({ theme }) => theme.panel.a1};
`

export const StyledMenuContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding-top: 10vh;
    gap: 10vh;
    align-items: center;
    height: 90%;
    width: 80%;
    border-radius: 8px;
    ${({theme}) => theme.panel.a2};

`