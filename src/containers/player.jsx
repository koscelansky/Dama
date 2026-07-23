import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import PlayerLabel from '../components/player-label'
import Ai from './ai'
import { gameResultSelector } from '../selectors'
import { GameResult } from '../game_logic/const'

const Wrapper = styled.div`
  ${({ $active }) => $active && 'filter: drop-shadow(0 0 2px orange);'}
  margin-left: 0.1em;
  display: flex;
  justify-content: space-between;
  flex-direction: ${props => (props.$right ? 'row-reverse' : 'row')};
  align-items: center;
`

const AiWrapper = styled.div`
  flex-basis: 20%;
`

const PlayerLabelWrapper = styled.div`
  flex-basis: 80%;
`

const Player = ({ color, right }) => {
  const colorAbbreviation = color === 'white' ? 'W' : 'B'
  const result = useSelector(gameResultSelector)
  const boardTurn = useSelector(state => state.board.turn)
  const settings = useSelector(state => state.gameSettings[color])
  const turn = boardTurn === colorAbbreviation && result === GameResult.InProgress
  const { type } = settings

  const [name, options] = (() => {
    switch (type) {
      case 'ai-random':
        return ['Random', {}]
      case 'ai-minmax': {
        const { time, evaluate, alphaBeta } = settings
        return ['MinMax', { time, evaluate, alphaBeta }]
      }
      case 'human':
      default:
        return [settings.name, {}]
    }
  })()

  const ai = turn && type.startsWith('ai-') ? <Ai type={type} options={options} /> : null

  return (
    <Wrapper $active={turn} $right={right}>
      <PlayerLabelWrapper>
        <PlayerLabel color={color} right={right}>
          {name}
        </PlayerLabel>
      </PlayerLabelWrapper>
      <AiWrapper>{ai}</AiWrapper>
    </Wrapper>
  )
}

Player.propTypes = {
  color: PropTypes.oneOf(['black', 'white']),
  right: PropTypes.bool,
}

export default Player
