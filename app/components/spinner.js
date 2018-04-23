import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  
  to {
    transform: rotate(360deg);
  }
`

const Spinner = styled.div`
  border: 0.2em solid lightsteelblue;
  border-top: 0.2em solid blue;
  border-radius: 50%;
  box-sizing: border-box;
  width: 100%;
  animation: ${spin} 2s linear infinite;

  &::after {
    padding-bottom: 100%;
    display: block;
    content: '';
  }
`

export default Spinner
