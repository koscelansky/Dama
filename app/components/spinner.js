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
  border: 1em solid lightsteelblue;
  border-top: 1em solid blue;
  border-radius: 50%;
  width: 100%;
  animation: ${spin} 2s linear infinite;

  &::after {
    padding-bottom: 100%;
    display: block;
    content: '';
  }
`

export default Spinner
