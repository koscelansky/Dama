import React from 'react'
import PropTypes from 'prop-types'

import Svg from './svg'

const Queen = (props) => {
  const { black } = props
  const pic = './svg/pieces/' + (black ? 'Chess_qdt45.svg' : 'Chess_qlt45.svg')

  return (
    <Svg data={pic} />
  )
}

export default Queen

Queen.propTypes = {
  black: PropTypes.bool
}
