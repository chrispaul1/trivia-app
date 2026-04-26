import styled from "styled-components";
import DataTable from "react-data-table-component";
import { FaFilter } from "react-icons/fa";

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
    &: hover{
        cursor: pointer;
    }
`

export const StyledLeaderboardContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: fit-content;
    width: 85%;
    max-width: 900px;
    z-index: 1000;
    ${({ theme }) => theme.panel.a3};
    border-radius: 6px;
    transform: translateY(-100%);
    &: hover{
        cursor: default;
    }
`

export const StyledUsernameCell = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    ${({ theme }) => theme.panel.a1};
    cursor: pointer;
    color: blue;
`

export const StyledColumnCell = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    height: 100%;
    width: 100%;
    min-width: 75px;
    background: ${({ theme }) => theme.panel.baseColor};
`

export const StyledHeaderRowText = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-evenly;
`

export const StyledFilterIcon = styled(FaFilter)`
    cursor: pointer;
`

export const StyledFilterContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: 10%;
    min-height: 50px;
    overflow-x: auto;
`

export const StyledTable = styled(DataTable)`
    .rdt_Table {
        background-color: ${({ theme }) => theme.baseColor};
        border-radius: inherit;
        min-width: 500px;
    }

    .rdt_TableHead {
        background-color: ${({theme}) => theme.baseColor};
    }

    .rdt_TableCell {
        ${({ theme }) => theme.panel.a1};
        border-radius: inherit;
    }
        
    .rdt_TableHeadRow {
        ${({ theme }) => theme.panel.a3};
        min-width: 175px;
    }
    
`



