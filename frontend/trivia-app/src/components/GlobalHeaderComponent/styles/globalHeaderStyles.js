import styled from "styled-components";

export const StyledGlobalHeaderContainer = styled.div`
  display: flex;
  height: 5vh;
  min-height: 75px;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  ${({ theme }) => theme.panel.a2};
`

export const StyledGlobalHeaderLeftDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 50%;
  ${({ theme }) => theme.panel.a2};
`

export const StyledGlobalHeaderTitle = styled.h2`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  font-size: calc(1.5rem + 1vw);
  ${({ theme }) => theme.panel.a2};
`

export const StyledGlobalHeaderRightDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 15px;
  height: 100%;
  width: 50%;
  ${({ theme }) => theme.panel.a2};
`

export const StyledGlobalHeaderButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: fit-content;
  font-size: calc(.25rem + 1vh);
  border-radius: 5px;
  ${({theme}) => theme.primaryButton};
  // background: ${props => props.disabled ? "grey" : "white"};
  // color: black;

  // &:hover{
  //   background: lightblue;
  //   cursor: ${props => props.disabled ? "not-allowed" : "pointer"};
  // }
`