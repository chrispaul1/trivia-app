import styled from "styled-components";

export const StyledGlobalHeaderContainer = styled.div`
  display: flex;
  height: 5vh;
  min-height: 75px;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  background: orange;
`

export const StyledGlobalHeaderLeftDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 50%;
  ${({ theme }) => theme.panel.a1};

`

export const StyledGlobalHeaderRightDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 15px;
  height: 100%;
  width: 50%;
  ${({ theme }) => theme.panel.a1};
`

export const StyledGlobalHeaderButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: fit-content;
  font-size: 1rem;
  border-radius: 5px;
  ${({theme}) => theme.primaryButton}
  // background: ${props => props.disabled ? "grey" : "white"};
  // color: black;

  // &:hover{
  //   background: lightblue;
  //   cursor: ${props => props.disabled ? "not-allowed" : "pointer"};
  // }
`

export const StyledGlobalHeaderTitle = styled.h2`
  display: flex;
  align-items center;
  justfy-content: center;
  ${({ theme }) => theme.panel.a1};
`