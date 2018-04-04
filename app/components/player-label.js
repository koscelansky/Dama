import React from 'react'
import PropTypes from 'prop-types'

import Pawn from './pawn'

const PlayerLabel = (props) => {
  const float = props.right ? 'right' : 'left'

  return (
    <React.Fragment>
      <div style={{float, width: '1.2em', verticalAlign: 'middle'}}>
        <Pawn black={props.color === 'black'} />
      </div>
      <div style={{float}}>
        { props.children }
      </div>
    </React.Fragment>
  )
}

export default PlayerLabel

PlayerLabel.propTypes = {
  color: PropTypes.string, // white|black
  right: PropTypes.bool // true if color sqaure should be on right
}
