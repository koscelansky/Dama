import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Pawn from './pawn'
import Queen from './queen'

export default class Piece extends Component {
  render () {
    const { type } = this.props

    switch (type) {
      case 'WM': return <Pawn />
      case 'WK': return <Queen />
      case 'BM': return <Pawn black />
      case 'BK': return <Queen black />
      default: return null
    }
  }
}

Piece.propTypes = {
  type: PropTypes.string
}
