import styled from 'styled-components'
import PropTypes from 'prop-types'

const PlayerLabel = styled.span`
  &::${props => props.right ? 'after' : 'before'} {
    font-size: 1.7em;
    display: inline-block;
    transform: 'translateY(-0.15em)';
    content: '${props => props.color === 'white' ? '□' : '■'}';
  }
`

export default PlayerLabel

PlayerLabel.propTypes = {
  color: PropTypes.string, // white|black
  right: PropTypes.bool // true if color sqaure should be on right
}
