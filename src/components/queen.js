import React from 'react'
import PropTypes from 'prop-types'

import Svg from './svg'

import BlackQueen from '../svg/pieces/Chess_qdt45.svg'
import WhiteQueen from '../svg/pieces/Chess_qlt45.svg'

const Queen = (props) => {
  const { black } = props
  const pic = (black ? BlackQueen : WhiteQueen)

  return (
    <Svg data={pic} />
  )
}

export default Queen

Queen.propTypes = {
  black: PropTypes.bool
}
