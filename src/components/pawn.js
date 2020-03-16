import React from 'react'
import PropTypes from 'prop-types'

import Svg from './svg'

import BlackPawn from '../svg/pawn-black.svg'
import WhitePawn from '../svg/pawn-white.svg'

const Pawn = (props) => {
  const { black } = props
  const pic = (black ? BlackPawn : WhitePawn)

  return (
    <Svg data={pic} />
  )
}

export default Pawn

Pawn.propTypes = {
  black: PropTypes.bool
}
