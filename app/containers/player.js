import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import PlayerLabel from '../components/player-label'

const Wrapper = styled.div`
  font-size: 5vw;
  ${({ active }) => active && `filter: drop-shadow(0 0 2px orange);`}
`

class Player extends Component {
  render () {
    const { right, color, name, turn } = this.props

    return (
      <Wrapper active={turn}>
        <PlayerLabel color={color} right={right}>{name}</PlayerLabel>
      </Wrapper>
    )
  }
}

function mapStateToProps (state, ownProps) {
  const colorAbbreviation = ownProps.color === 'white' ? 'W' : 'B'

  return {
    type: state[ownProps.color].type,
    name: state[ownProps.color].name,
    turn: state.board.turn === colorAbbreviation
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
