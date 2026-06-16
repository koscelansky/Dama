import PropTypes from 'prop-types'

import Svg from './svg'

// Use public URLs to avoid SVGR parsing of namespaced SVG files

const Pawn = ({ black }) => {
  const pic = black ? '/svg/pawn-black.svg' : '/svg/pawn-white.svg'

  return <Svg src={pic} />
}

export default Pawn

Pawn.propTypes = {
  black: PropTypes.bool,
}
