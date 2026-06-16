import PropTypes from 'prop-types'

import Svg from './svg'

// Use public URLs to avoid SVGR parsing of complex SVGs
const BlackQueenData = '/svg/Chess_qdt45.svg'
const WhiteQueenData = '/svg/Chess_qlt45.svg'

const Queen = ({ black }) => {
  const pic = black ? BlackQueenData : WhiteQueenData

  return <Svg src={pic} />
}

export default Queen

Queen.propTypes = {
  black: PropTypes.bool,
}
