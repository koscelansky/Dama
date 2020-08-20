import React from 'react'
import PropTypes from 'prop-types'

import Svg from './svg'

import BlackQueenData from './data/pieces/Chess_qdt45.svg'
import WhiteQueenData from './data/pieces/Chess_qlt45.svg'

const Queen = ({ black }) => {
  const pic = (black ? BlackQueenData : WhiteQueenData)

  return (
    <Svg data={pic} />
  )
}

export default Queen

Queen.propTypes = {
  black: PropTypes.bool
}
