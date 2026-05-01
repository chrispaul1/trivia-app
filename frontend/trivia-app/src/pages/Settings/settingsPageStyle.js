import styled from 'styled-components'

export const StyledParametersBackground = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: white;
  height: 100vh;
  width: 100%;
  ${({theme}) => theme.panel.a1};
`

export const StyledQuestionOutline = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 90%;
  width: 80%;
  gap: 5vh;
  padding: 5vh 5px 0 5px;
  border-radius: 8px;
  ${({ theme }) => theme.panel.a2}
`