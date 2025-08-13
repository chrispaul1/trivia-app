import React,{useState} from "react";
import { StyledDropdownItem } from "./styles";

export function DropdownItem({item,onClick}){
  return(
    <StyledDropdownItem>
      {item}
    </StyledDropdownItem>
  )
}