import { useState } from 'react'
import { useSelector } from 'react-redux'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import styled from 'styled-components'

import { gameResultSelector, possibleMovesSelector } from '../../selectors'

const DivWrapper = styled.div`
  padding-left: 1em;
  text-indent: -1em;
`

function getPlayerStatusString(player) {
  const { type, name: _, ...options } = player

  const result = (() => {
    if (type === 'human') {
      return JSON.stringify({ type }, null, 1)
    } else if (type === 'ai-random') {
      return JSON.stringify({ type }, null, 1)
    } else if (type === 'ai-minmax') {
      return JSON.stringify({ type, ...options }, null, 1)
    }
  })()

  return result.replace(/-/g, String.fromCharCode(8209))
}

const GameInfoDlg = () => {
  const [show, setShow] = useState(false)

  const result = useSelector(gameResultSelector)
  const moves = useSelector(possibleMovesSelector)
  const white = useSelector(state => getPlayerStatusString(state.gameSettings.white))
  const black = useSelector(state => getPlayerStatusString(state.gameSettings.black))
  const str = moves.join(' ')

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Game Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DivWrapper>Result: {result}</DivWrapper>
          <DivWrapper>Possible moves: {str}</DivWrapper>
          <DivWrapper>White: {white}</DivWrapper>
          <DivWrapper>Black: {black}</DivWrapper>
        </Modal.Body>
      </Modal>
      <Button onClick={handleShow}>Game Info</Button>
    </>
  )
}

export default GameInfoDlg
