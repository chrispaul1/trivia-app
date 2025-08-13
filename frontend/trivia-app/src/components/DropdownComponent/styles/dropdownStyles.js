import styled from "styled-components"
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";

export const StyledDropdownOutline = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  align-items: cener;
`

export const StyledDropdown = styled.div`
  display: flex;
  width: fit-content;
  height: fit-content;
  align-items: center;
  padding: 1rem;
  background: white;
  cursor: pointer;
  border-radius: 0.25rem;
  box-shadow: 0px 8px 24px rgb(149,157,165,.2);
`
export const StyledDropdownContent = styled.ul`
display: flex;
flex-directions: column;
//position: absolute;
min-width: inherit;
align-items: center;
border: 1px solid black;
padding: 1rem;
background-color: red;
margin-top: 0.25rem;
height: fit-content;
max-height: 40vh;
box-shadow: 0px 8px 24px rgb(149,157,165,.2);
overflow-y: scroll;
scrollbar-width: none;
-ms-overflow-style: none;
`

export const StyledDropdownItem = styled.li`
  display: flex;
  justif-content: center;
  align-items: center;
  margin: 0.1rem;
  width: 100%;
  cursor: pointer;
  &:hover{
    background-color: rgb(240,249,255); 
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