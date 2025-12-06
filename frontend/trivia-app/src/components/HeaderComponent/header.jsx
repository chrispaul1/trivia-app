import React, {useState,useEffect} from "react"
import {
  StyledHeaderTitle,
  StyledHeaderOutline,
  StyledHeaderLeftDiv,
  StyledHeaderRightDiv,
  StyledHeaderMiddleDiv,
} from '.'

export function Header({headerObjs=[{}]}){

  const leftSide = headerObjs.filter(obj => obj.placement == "left")
  const middle = headerObjs.filter(obj => obj.placement == "middle")
  const rightSide = headerObjs.filter(obj => obj.placement == "right")
  const titleObj = middle.find(obj => obj.type == "title")

  return(
    <StyledHeaderOutline>
      <StyledHeaderLeftDiv>

      </StyledHeaderLeftDiv>
      <StyledHeaderMiddleDiv>
        <StyledHeaderTitle>
          {titleObj.text}
        </StyledHeaderTitle>
      </StyledHeaderMiddleDiv>
      <StyledHeaderRightDiv>

      </StyledHeaderRightDiv>
    </StyledHeaderOutline>
  )
}