import React,{useState,useEffect, Children} from "react";
import {DropdownContent } from ".";
import { StyledDropdownOutline, 
  StyledDropdown, 
  StyledChevronDown,
  StyledChevronUp } from ".";

export function DropDown({text,content}) {
  const [toggleDown,setToggleDown] = useState(false)
  return(
    <StyledDropdownOutline
      onClick={()=>setToggleDown((toggleDown) => !toggleDown)}
    >
      <StyledDropdown>
        {text} 
        {toggleDown ? <StyledChevronUp/> : <StyledChevronDown/>}
      </StyledDropdown>
      {toggleDown && 
        <DropdownContent
          content={content}
        />
      }
    </StyledDropdownOutline>
  )
}