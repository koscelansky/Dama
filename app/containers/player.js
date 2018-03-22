import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import PlayerLabel from '../components/player-label'

class Player extends Component {
  render () {
    const { right, color, name } = this.props

    return (
      <div style={{ fontSize: '5vw' }}>
        <PlayerLabel color={color} right={right}>{name}</PlayerLabel>
      </div>
    )
  }
}

function mapStateToProps (state, ownProps) {
  return {
    type: state[ownProps.color].type,
    name: state[ownProps.color].name
  }
}

function mapDispatchToProps (dispatch) {
  return {
  }
}

Player.propTypes = {
  color: PropTypes.oneOf(['black', 'white']),
  type: PropTypes.oneOf(['human', 'ai']),
  name: PropTypes.string, // name of the player
  right: PropTypes.bool // true if label should be on the right side
}

export default connect(mapStateToProps, mapDispatchToProps)(Player)
