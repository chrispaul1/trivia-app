import styled from "styled-components";

export const StyledLeaderboardBackground = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    position: absolute;
    backdrop-filter: blur(4px);
    /* Add a semi-transparent background color for better contrast */
    background-color: rgba(0, 0, 0, 0.4);
`

export const StyledLeaderboardContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: fit-content;
    width: 85%;
    max-width: 900px;
`
