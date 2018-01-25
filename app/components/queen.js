
import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Queen extends Component {
  render () {
    const { black } = this.props
    const pic = './svg/pieces/' + (black ? 'Chess_qdt45.svg' : 'Chess_qlt45.svg')

    const objectStyle = {
      userSelect: 'none',
      pointerEvents: 'none'
    }

    return (
      <object type='image/svg+xml' data={pic} style={objectStyle} />
    )
  }
}

Queen.propTypes = {
  black: PropTypes.bool
}
