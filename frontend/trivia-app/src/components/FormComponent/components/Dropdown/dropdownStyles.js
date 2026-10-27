import styled from "styled-components"

export const StyledDropdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  position: relative;
  align-items: center;
`
export const StyledQuestionLabel = styled.label`
  display: flex;
  min-width: fit-content;
  width: 100%;
  font-size: 1.5rem;
  font-weight: bold;
  padding: .5rem .25rem .5rem .25rem;
  height: fit-content;
  min-height: 70px;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  ${({ theme }) => theme.panel.a3};
  border: solid 1px ${({ theme }) => theme.panel.a4.backgroundColor};

`
export const StyledDropdownContent = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: absolute;
  top:100%;
  align-items: center;
  padding: .5rem .5rem .5rem .5rem;
  background-color: white;
  border-radius: 0.25rem;
  margin-top: 0.25rem;
  height: fit-content;
  max-height: 40vh;
  box-shadow: 0px 8px 24px rgb(149,157,165,.2);
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
  z-index: 100;
  ${({ theme }) => theme.glass.a4};
`
export const StyledDropdownLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`

export const StyledDropdownItem = styled.li`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin: 0.1rem;
  cursor: pointer;
  column-gap: 0.5rem;
  &:hover{
    border-radius: 0.25rem;
    background-color:   ${({ theme }) => theme.glass.a3.backgroundColor};
  }
`

export const StyledIconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 1rem;

  svg{
    font-size: 1rem;
    color: ${({ theme }) => theme.textColor};
    transition: transform 0.2s ease-in-out;
  }
`
