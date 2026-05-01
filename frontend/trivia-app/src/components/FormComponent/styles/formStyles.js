import styled from "styled-components"

export const StyledFormOutline = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 90%;
  width: 80%;
  gap: 5vh;
  padding: 5vh 5px 0 5px;
  border-radius: 8px;
  border: solid 1px red;
  ${({theme}) => theme.panel.a2}
`

