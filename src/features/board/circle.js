import React from 'react'
import styled from 'styled-components/macro'
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

const Circle = ({ color, blur, shadow, children }) => (
  <CircleWrapper color={color} blur={blur} shadow={shadow}>
    <div style={{ position: 'absolute', width: '100%' }}>
      {children}
    </div>
  </CircleWrapper>
)

export default Circle

Circle.propTypes = {
  color: PropTypes.string,
  blur: PropTypes.string,
  shadow: PropTypes.string
}
