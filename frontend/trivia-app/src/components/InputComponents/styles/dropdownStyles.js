import styled from "styled-components"
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";

export const StyledDropdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  align-items: center;
`
export const StyledQuestionDiv = styled.div`
  display: flex;
  min-width: fit-content;
  width: 95%;
  font-size: 1rem;
  padding: .5rem .25rem .5rem .25rem;
  height: fit-content;
  align-items: center;
  background-color: white;
  cursor: pointer;
  border-radius: 0.25rem;
  box-shadow: 0px 8px 24px rgb(149,157,165,.2);
`
export const StyledDropdownContent = styled.ul`
display: flex;
flex-direction: column;
width: 95%;
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
`
export const StyledDropdownLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`

export const StyledDropdownItem = styled.li`
  display: flex;
  width: 90%;
  justify-content: center;
  align-items: center;
  margin: 0.1rem;
  cursor: pointer;
  &:hover{
    border-radius: 0.25rem;
    background-color: #d3d3d3;
  }
`

export const StyledChevronDown = styled(FaChevronDown)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 1rem;
`
export const StyledChevronUp = styled(FaChevronUp)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 1rem;
`