import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

const SquareLabel = styled.div`
  color: white;
  user-select: none;
  cursor: default;
  position: absolute;
  right: 0;
  margin: 4% 7%;
`

const SquareDiv = styled.div`
  background-color: ${props => props.fill};
  position: relative;

  &::after {
    padding-bottom: 100%;
    display: block;
    content: '';
  }
`

const Square = (props) => {
  const { fill, label } = props

  return (
    <SquareDiv fill={fill}>
      <SquareLabel>{label}</SquareLabel>
      <div style={{ position: 'absolute', width: '100%' }}>
        <div style={{ margin: '12%', position: 'relative' }}>
          {props.children}
        </div>
      </div>
    </SquareDiv>
  )
}

export default Square

Square.propTypes = {
  fill: PropTypes.string.isRequired,
  label: PropTypes.number
}
