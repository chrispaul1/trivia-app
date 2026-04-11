import styled from "styled-components";

export const StyledGlobalHeaderContainer = styled.div`
  display: flex;
  height: 5vh;
  min-height: 75px;
  width: 100%;
  align-items: center;
  justify-content: center;
  background: orange;
`

export const StyledGlobalHeaderLeftDiv = styled.div`
  display: flex;
  height: 100%;
  background: blue;
  width: 25%;
  flex-grow: 2;
  align-items: center;
  justify-content: center;
  border: solid 1px black;
`

export const StyledGlobalHeaderRightDiv = styled.div`
  display: flex;
  height: 100%;
  width: stretch;
  width: 25%;
  background: red;
  align-items: center;
  justify-content: center;
  border: solid 1px black;
  color: black;
`

export const StyledGlobalHeaderButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: fit-content;
  font-size: 1rem;
  border-radius: 5px;
  background: ${props => props.disabled ? "grey" : "white"};
  color: black;

  &:hover{
    background: lightblue;
    cursor: ${props => props.disabled ? "not-allowed" : "pointer"};
  }
`

export const StyledGlobalHeader = styled.h2`
  display: flex;
  align-items center;
  justfy-content: center;
  background: purple;
  color: black;
`