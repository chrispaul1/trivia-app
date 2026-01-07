import styled from "styled-components";

export const StyledHeaderOutline = styled.div`
  display: flex;
  height: 10vh;
  width: 100%;
  align-items: center;
  justify-content: center;
  background: orange;
`

export const StyledHeaderLeftDiv = styled.div`
  display: flex;
  height: 100%;
  background: blue;
  width: stretch;
  width: 25%;
  align-items: center;
  justify-content: center;
  border: solid 1px black;
`

export const StyledHeaderMiddleDiv = styled.div`
  display: flex;
  height: 100%;
  min-width: fit-content;
  width: 50%;
  align-items: center;
  justify-content: center;
  border: solid 1px black;
`

export const StyledHeaderRightDiv = styled.div`
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

export const StyledHeaderButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: fit-content;
  font-size: 1rem;
  border-radius: 5px;
  background: white;
  color: black;

  &:hover{
    background: lightblue;
    cursor: pointer;
  }
`

export const StyledHeaderTitle = styled.div`
  display: flex;
  align-items center;
  justfy-content: center;
  font-size: 2rem;
  color: black;
`

export const StyledSubmitDiv = styled.div`

`