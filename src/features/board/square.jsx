import PropTypes from 'prop-types'
import styled from 'styled-components'

const SquareDiv = styled.div`
  background-color: ${props => props.fill};
  position: relative;

  &::after {
    padding-bottom: 100%;
    display: block;
    content: '';
  }
`

const Square = props => {
  const { fill } = props

  return (
    <SquareDiv fill={fill}>
      <div style={{ position: 'absolute', width: '100%' }}>
        <div style={{ margin: '12%', position: 'relative' }}>{props.children}</div>
      </div>
    </SquareDiv>
  )
}

export default Square

Square.propTypes = {
  fill: PropTypes.string.isRequired,
  label: PropTypes.number,
  children: PropTypes.node,
}
