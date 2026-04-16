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