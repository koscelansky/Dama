import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import PlayerLabel from '../components/player-label'

class Player extends Component {
  render () {
    const { right, color } = this.props
    const text = this.props.type === 'ai' ? 'Computer' : 'Human'

    return (
      <div style={{ fontSize: '5vw' }}>
        <PlayerLabel color={color} right={right}>{text}</PlayerLabel>
      </div>
    )
  }
}

function mapStateToProps (state, ownProps) {
  return {
    type: state[ownProps.color]
  }
}

function mapDispatchToProps (dispatch) {
  return {
  }
}

Player.propTypes = {
  color: PropTypes.string, // black | white
  type: PropTypes.string, // human | ai
  right: PropTypes.bool // true if label should be on the right side
}

export default connect(mapStateToProps, mapDispatchToProps)(Player)
