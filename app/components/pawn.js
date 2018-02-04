
import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Pawn extends Component {
  render () {
    const { black } = this.props
    const pic = './svg/pawn-' + (black ? 'black' : 'white') + '.svg'

    const objectStyle = {
      userSelect: 'none',
      pointerEvents: 'none',
      width: '100%'
    }

    return (
      <object type='image/svg+xml' data={pic} style={objectStyle} />
    )
  }
}

Pawn.propTypes = {
  black: PropTypes.bool
}
