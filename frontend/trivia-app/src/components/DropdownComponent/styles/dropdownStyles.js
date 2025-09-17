import styled from "styled-components"
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";

export const StyledDropdownOutline = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  background: blue;
  gap: 5px;
  align-items: center;
  padding: 2px 0 2px 0;
`

export const StyledDropdown = styled.div`
  display: flex;
  min-width: fit-content;
  width: 100%;
  height: fit-content;
  align-items: center;
  padding: .5rem 0rem .5rem 0rem;
  background-color: white;
  cursor: pointer;
  border-radius: 0.25rem;
  box-shadow: 0px 8px 24px rgb(149,157,165,.2);
`
export const StyledDropdownContent = styled.ul`
display: flex;
flex-direction: column;
width: 100%;
align-items: center;
padding: 1rem 0rem 1rem 0rem;
background-color: white;
border-radius: 0.25rem;
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