import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Circle extends Component {
  render () {
    const { color, blur, shadow } = this.props

    const objectStyle = {
      position: 'relative',
      borderRadius: '50%',
      background: color,
      filter: `blur(${blur})`,
      boxShadow: shadow
    }

    const contentStyle = {
      position: 'absolute',
      width: '100%',
      height: '100%'
    }

    return (
      <div style={objectStyle}>
        <div style={contentStyle}>
          { this.props.children }
        </div>
        <div style={{ paddingBottom: '100%', display: 'block' }} />
      </div>
    )
  }
}

Circle.propTypes = {
  color: PropTypes.string,
  blur: PropTypes.string,
  shadow: PropTypes.string
}
