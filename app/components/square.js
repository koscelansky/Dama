import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import SquareLabel from './square-label'

const LabelWrapper = styled.div`
  font-size: 2.5vw;
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
      <LabelWrapper>
        <SquareLabel>{ label }</SquareLabel>
      </LabelWrapper>
      <div style={{ position: 'absolute', width: '100%' }}>
        <div style={{ margin: '12%', position: 'relative' }}>
          { props.children }
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
