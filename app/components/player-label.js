import React from 'react'
import PropTypes from 'prop-types'

import Pawn from './pawn'

const PlayerLabel = (props) => {
  const float = props.right ? 'right' : 'left'

  return (
    <React.Fragment>
      <div style={{ float, width: '1.2em' }}>
        <Pawn black={props.color === 'black'} />
      </div>
      { props.children }
    </React.Fragment>
  )
}

export default PlayerLabel

PlayerLabel.propTypes = {
  color: PropTypes.oneOf(['white', 'black']),
  right: PropTypes.bool // true if color square should be on right
}
