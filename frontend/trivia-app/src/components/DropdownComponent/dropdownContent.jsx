import React,{useState,useEffect} from "react";
import { StyledDropdownContent, StyledDropdownItem } from "./styles";
import { DropdownItem } from "./dropdownItem";

export function DropdownContent({content}) {
  const dummy = ['1','2','3']
  return(
    <StyledDropdownContent>
      {content.map((item)=>(
        <DropdownItem
          key={item}
          item={item}
        />
      ))}
    </StyledDropdownContent>
  )
}