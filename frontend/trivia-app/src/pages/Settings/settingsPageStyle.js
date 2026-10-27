import styled from 'styled-components'

export const StyledParametersBackground = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: white;
  height: 100vh;
  width: 100vw;
  ${({theme}) => theme.basePanel};
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
  border-radius: 20px;
  border: solid 1px ${({ theme }) => theme.panel.a2.backgroundColor};
  ${({ theme }) => theme.panel.a1}
  overflow-y: scroll;
  padding-bottom: 50px;
  /* Apply to the body or a specific container class */
  .no-scrollbar {
      /* Firefox */
      scrollbar-width: none; 
      
      /* Internet Explorer and Legacy Edge */
      -ms-overflow-style: none; 
  }

  /* WebKit-based browsers (Chrome, Safari, Opera, newer Edge) */
  .no-scrollbar::-webkit-scrollbar {
      display: none;
  }
`

export const StyledIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 10px;
  color: ${({theme}) => theme.primaryButton.backgroundColor};
`

export const StyledDifficultyDiv = styled.div`
  display: flex;

`