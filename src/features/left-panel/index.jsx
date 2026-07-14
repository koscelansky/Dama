import { useState } from 'react'
import { useDispatch } from 'react-redux'
import Button from 'react-bootstrap/Button'
import Stack from 'react-bootstrap/Stack'
import styled from 'styled-components'

import FenDlg from '../fen-dlg'
import NewGameModal from '../../containers/new-game-modal'
import { newGame } from '../../reducers/actions'

const ButtonGroup = styled(Stack)`
  gap: 0.5rem;
  width: 120px;
`

const LeftPanel = () => {
  const [showNewGameModal, setShowNewGameModal] = useState(false)
  const dispatch = useDispatch()

  const handleNewGame = () => {
    setShowNewGameModal(true)
  }

  const handleStartNewGame = (white, black, fen) => {
    console.log('Starting new game with', white, black, fen)
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
      </ButtonGroup>
    </>
  )
}

export default LeftPanel
