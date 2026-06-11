import styled from 'styled-components'
import InlineSVG from 'react-inlinesvg'

const Svg = styled(InlineSVG)`
  user-select: none;
  pointer-events: none;
  width: 100%;
  display: block;

  svg {
    display: block;
    width: 100%;
    height: auto;
  }
`

export default Svg
