import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const CircleWrapper = styled.div`
  position: relative;
  border-radius: 50%;
  background: ${props => props.color};
  filter: blur(${props => props.blur});
  box-shadow: ${props => props.shadow};
  width: 100%;

  &::after {
    padding-bottom: 100%;
    display: block;
    content: '';
  }
`

const Circle = (props) => {
  const { color, blur, shadow } = props

  return (
    <CircleWrapper color={color} blur={blur} shadow={shadow}>
      <div style={{ position: 'absolute', width: '100%' }}>
        {props.children}
      </div>
    </CircleWrapper>
  )
}

export default Circle

Circle.propTypes = {
  color: PropTypes.string,
  blur: PropTypes.string,
  shadow: PropTypes.string
}
