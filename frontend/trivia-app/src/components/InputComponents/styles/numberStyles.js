import styled from "styled-components";

export const StyledNumberContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  row-gap: 5px;
  position: relative;
`

export const StyledNumberLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`

export const StyledInput = styled.input`
  display: flex;
  width: 95%;
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