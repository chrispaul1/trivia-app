import styled from "styled-components"

export const StyledTimeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  row-gap: 5px;
  position: relative;
`
  
export const StyledInputDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;  
  width:100%;
`

export const StyledInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width : 100%;
`

export const StyledTimeLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-size: 1rem;
`

export const StyledHourInput = styled.input`
  display: flex;
  width: 40%;
  color: black;
  background: white;
  padding: .5rem 0 .5rem .5rem;
  border-radius: .25rem;
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
    input[type=number] {
    -moz-appearance: textfield;
  }
}
`

export const StyledMinuteInput = styled.input`
  display: flex;
  width: 50%;
  color: black;
  background: white;
  padding: .5rem 0 .5rem .5rem;
  border-radius: .25rem;
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
    input[type=number] {
    -moz-appearance: textfield;
  }
}
`

export const StyledSecondInput = styled.input`
  display: flex;
  width: 50%;
  color: black;
  background: white;
  padding: .5rem 0 .5rem .5rem;
  border-radius: .25rem;
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
    input[type=number] {
    -moz-appearance: textfield;
  }
}
`