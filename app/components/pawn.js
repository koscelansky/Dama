import React from 'react'
import PropTypes from 'prop-types'

import Svg from './svg'

const Pawn = (props) => {
  const { black } = props
  const pic = './svg/pawn-' + (black ? 'black' : 'white') + '.svg'

  return (
    <Svg data={pic} />
  )
}

export default Pawn

Pawn.propTypes = {
  black: PropTypes.bool
}
