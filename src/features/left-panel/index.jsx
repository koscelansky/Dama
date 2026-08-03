import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from 'react-bootstrap/Button'
import Stack from 'react-bootstrap/Stack'
import styled from 'styled-components'

import FenDlg from '../fen-dlg'
import GameInfoDlg from './game-info-dlg'
import NewGameModal from '../../containers/new-game-modal'
import { newGame, toggleMinimaxAnalysis } from '../../reducers/actions'

const ButtonGroup = styled(Stack)`
  gap: 0.5rem;
  width: 120px;
`

const LeftPanel = () => {
  const [showNewGameModal, setShowNewGameModal] = useState(false)
  const dispatch = useDispatch()
  const analysisEnabled = useSelector(state => state.minimaxAnalysis.enabled)
  const hasMinimaxPlayer = useSelector(
    state =>
      state.gameSettings.white.type === 'ai-minmax' ||
      state.gameSettings.black.type === 'ai-minmax'
  )

  const handleNewGame = () => {
    setShowNewGameModal(true)
  }

  const handleStartNewGame = (white, black, fen) => {
    dispatch(newGame(white, black, fen))
    setShowNewGameModal(false)
  }

  return (
    <>
      <NewGameModal
        show={showNewGameModal}
        onHide={() => setShowNewGameModal(false)}
        onSubmit={handleStartNewGame}
      />
      <ButtonGroup>
        <Button type='button' onClick={handleNewGame} variant='primary'>
          New Game
        </Button>
        <FenDlg />
        <GameInfoDlg />
        <Button
          type='button'
          onClick={() => dispatch(toggleMinimaxAnalysis())}
          variant={analysisEnabled ? 'secondary' : 'outline-secondary'}
          disabled={!hasMinimaxPlayer}
          aria-pressed={analysisEnabled}
          title={hasMinimaxPlayer ? undefined : 'Available when a MinMax player is in the game'}
        >
          MinMax Info
        </Button>
      </ButtonGroup>
    </>
  )
}

export default LeftPanel
