import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import PlayerLabel from '../components/player-label'
import Ai from './ai'
import { gameResultSelector } from '../selectors'
import { GameResult } from '../game_logic/const'

const Wrapper = styled.div`
  ${({ active }) => active && `filter: drop-shadow(0 0 2px orange);`}
  margin: 0.3em 10px 0.5em 10px;
`

const AiWrapper = styled.span`
  display: inline-block;
  width: 1.2em;
  font-size: 1ex;
  margin: 0 1ex 0 1ex;
`

class Player extends Component {
  render () {
    const { right, color, name, turn, type, options } = this.props

    let ai = null
    if (turn && type.startsWith('ai-')) {
      ai = (
        <AiWrapper>
          <Ai type={type} options={options} />
        </AiWrapper>
      )
    }

    return (
      <Wrapper active={turn}>
        { ai }
        <PlayerLabel color={color} right={right}>{name}</PlayerLabel>
      </Wrapper>
    )
  }
}

function mapStateToProps (state, ownProps) {
  const colorAbbreviation = ownProps.color === 'white' ? 'W' : 'B'
  const result = gameResultSelector(state)

  const type = state[ownProps.color].type

  const [name, options] = (() => {
    switch (type) {
      case 'ai-random': {
        return ['Random', {}]
      }
      case 'ai-minmax': {
        const depth = state[ownProps.color].depth
        return ['MinMax ' + depth, { depth }]
      }
      case 'human': {
        return [state[ownProps.color].name, {}]
      }
    }
  })()

  return {
    type,
    name,
    turn: state.board.turn === colorAbbreviation && result === GameResult.InProgress,
    options
  }
}

function mapDispatchToProps (dispatch) {
  return {
  }
}

Player.propTypes = {
  color: PropTypes.oneOf(['black', 'white']),
  type: PropTypes.oneOf(['human', 'ai-random', 'ai-minmax']),
  name: PropTypes.string, // name of the player
  right: PropTypes.bool, // true if label should be on the right side
  options: PropTypes.any // options passed to ai player
}

export default connect(mapStateToProps, mapDispatchToProps)(Player)
