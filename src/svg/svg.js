import styled from 'styled-components'

const Svg = styled.object.attrs({
  type: 'image/svg+xml'
})`
  user-select: none;
  pointer-events: none;
  width: 100%;
  display: block;
`

export default Svg
