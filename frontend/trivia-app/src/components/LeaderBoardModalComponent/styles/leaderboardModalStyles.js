import styled from "styled-components";
import DataTable from "react-data-table-component";

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
    &: hover{
        cursor: default;
    }
`

export const StyledColumnCell = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    ${({theme}) => theme.panel.a1};
    cursor: pointer;
    color: blue;
`

export const StyledTable = styled(DataTable)`
    .rdt_Table {
        border: 1px solid #ccc;
        background-color: ${({ theme }) => theme.baseColor};
    }

    .rdt_TableHead {
        background-color: ${({theme}) => theme.baseColor};
    }
    
    .rdt_TableCell {
        ${({ theme }) => theme.panel.a1};
    }
        
    .rdt_TableHeadRow {
        ${({ theme }) => theme.panel.a3};
    }
    

`



