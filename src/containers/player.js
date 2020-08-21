import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import PlayerLabel from '../components/player-label'
import Ai from './ai'
import { gameResultSelector } from '../selectors'
import { GameResult } from '../game_logic/const'

const Wrapper = styled.div`
  ${({ active }) => active && 'filter: drop-shadow(0 0 2px orange);'}
  margin-left: 0.1em;
  display: flex;
  justify-content: space-between;
  flex-direction: ${props => (props.right ? 'row-reverse' : 'row')};
  align-items: center;
`

const AiWrapper = styled.div`
  flex-basis: 20%;
  font-size: calc(2vmin + 20px);
`

// it looks like there is no way to do what I need without this, it renders
// differently in Firefox and Chrome (Electron), it looks like they calculate
// the width of the spinner very differently (like 5x difference)
const AiSpinnerMargin = styled.div`
  margin: 20%;
`

const PlayerLabelWrapper = styled.div`
  flex-basis: 80%;
`

class Player extends Component {
  render () {
    const { right, color, name, turn, type, options } = this.props

    let ai = null
    if (turn && type.startsWith('ai-')) {
      ai = <Ai type={type} options={options} />
    }

    return (
      <Wrapper active={turn} right={right}>
        <PlayerLabelWrapper>
          <PlayerLabel color={color} right={right}>{name}</PlayerLabel>
        </PlayerLabelWrapper>
        <AiWrapper>
          <AiSpinnerMargin>
            {ai}
          </AiSpinnerMargin>
        </AiWrapper>
      </Wrapper>
    )
  }
}

function mapStateToProps (state, ownProps) {
  const colorAbbreviation = ownProps.color === 'white' ? 'W' : 'B'
  const result = gameResultSelector(state)

  const settings = state.gameSettings

  const type = settings[ownProps.color].type

  const [name, options] = (() => {
    switch (type) {
      case 'ai-random': {
        return ['Random', { time: null }]
      }
      case 'ai-minmax': {
        const { time, evaluate, alphaBeta } = settings[ownProps.color]
        return ['MinMax', { time, evaluate, alphaBeta }]
      }
      case 'human':
      default: {
        return [settings[ownProps.color].name, {}]
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

Player.propTypes = {
  color: PropTypes.oneOf(['black', 'white']),
  type: PropTypes.oneOf(['human', 'ai-random', 'ai-minmax']),
  name: PropTypes.string, // name of the player
  right: PropTypes.bool, // true if label should be on the right side
  options: PropTypes.any // options passed to ai player
}

export default connect(mapStateToProps)(Player)
