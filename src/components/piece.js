import React from 'react'
import PropTypes from 'prop-types'

import Pawn from '../svg/pawn'
import Queen from '../svg/queen'

const Piece = ({ type }) => {
  switch (type) {
    case 'WM': return <Pawn />
    case 'WK': return <Queen />
    case 'BM': return <Pawn black />
    case 'BK': return <Queen black />
    default: return null
  }
}

export default Piece

Piece.propTypes = {
  type: PropTypes.string
}
