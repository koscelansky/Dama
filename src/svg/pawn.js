import React from 'react'
import PropTypes from 'prop-types'

import Svg from './svg'

import BlackPawnData from './data/pawn-black.svg'
import WhitePawnData from './data/pawn-white.svg'

const Pawn = ({ black }) => {
  const pic = (black ? BlackPawnData : WhitePawnData)

  return (
    <Svg data={pic} />
  )
}

export default Pawn

Pawn.propTypes = {
  black: PropTypes.bool
}
