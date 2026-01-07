import React, {useState,useEffect} from "react"
import {
  StyledHeaderTitle,
  StyledHeaderButton,
  StyledHeaderOutline,
  StyledHeaderLeftDiv,
  StyledHeaderRightDiv,
  StyledHeaderMiddleDiv,
} from '.'

export function Header({headerObjs=[{}],disableButton}) {

  const leftSide = headerObjs.filter(obj => obj.placement == "left")
  const middle = headerObjs.filter(obj => obj.placement == "middle")
  const rightSide = headerObjs.filter(obj => obj.placement == "right")
  const titleObj = middle.find(obj => obj.type == "title")
  console.log(disableButton,"---disable---")
  return(
    <StyledHeaderOutline>
      <StyledHeaderLeftDiv>
        hello
      </StyledHeaderLeftDiv>
      <StyledHeaderMiddleDiv>
        <StyledHeaderTitle>
          {titleObj.text}
        </StyledHeaderTitle>
      </StyledHeaderMiddleDiv>
      <StyledHeaderRightDiv>
        {rightSide.map(obj => (
          <StyledHeaderButton key={obj.id}
            onClick={obj.function}
            disabled={disableButton}
          >
            {obj.text}
          </StyledHeaderButton>
        ))}
      </StyledHeaderRightDiv>
    </StyledHeaderOutline>
  )
}