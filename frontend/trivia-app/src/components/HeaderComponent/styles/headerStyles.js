import styled from "styled-components";

export const StyledHeaderOutline = styled.div`
  display: flex;
  height: 5vh;
  align-items: center;
  justify-content: center;
`

export const StyledHeaderLeftDiv = styled.div`
  display: flex;
  height: 100%;
  width: stretch;
  max-width: 25%;
  align-items: center;
  justify-content: center;
  //border: solid 1px red;
`

export const StyledHeaderMiddleDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  flex-grow: 1;
  //border: solid 1px blue;
`

export const StyledHeaderRightDiv = styled.div`
  display: flex;
  height: 100%;
  width: stretch;
  max-width: 25%;
  align-items: center;
  justify-content: center;
  color: black;
  padding: 0 5px 0 5px;
  //border: solid 1px green;
`

export const StyledHeaderButton = styled.button`
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
  ${({ theme }) => theme.primaryButton};

`

export const StyledHeaderTitle = styled.div`
  display: flex;
  align-items center;
  justfy-content: center;
  font-size: ${(props) => props.fontSize ? props.fontSize : `calc(.75rem + 1vw)`};
  ${({ theme }) => theme.panel.a3};
`

export const StyledSubmitDiv = styled.div`

`