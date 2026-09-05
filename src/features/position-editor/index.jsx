import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import styled from 'styled-components'

import { fromFen, isValidFen, toFen } from '../../fen'
import { newGame } from '../../reducers/actions'
import { toFenSelector } from '../../selectors'
import Piece from '../board/piece'

const EditorLayout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(16rem, 18rem);
  gap: 1rem;

  @media (width < 576px) {
    grid-template-columns: 1fr;
  }
`

const BoardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, minmax(0, 1fr));
  aspect-ratio: 1;
  width: 100%;
  max-width: 28rem;
  margin: 0 auto;
  border: 2px solid #343a40;
`

const Square = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
  min-height: 0;
  padding: 3%;
  border: 0;
  overflow: hidden;
  background: ${({ $playable }) => ($playable ? 'sienna' : 'blanchedalmond')};

  &:focus-visible {
    position: relative;
    z-index: 1;
    outline: 3px solid #0d6efd;
    outline-offset: -3px;
  }
`

const Palette = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`

const FenGroup = styled(Form.Group)`
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;

  label {
    margin-bottom: 0;
  }

  @media (width < 576px) {
    grid-template-columns: 1fr;
    align-items: start;
  }
`

const PieceButton = styled(Button)`
  display: grid;
  grid-template-columns: 2rem 1fr;
  align-items: center;
  gap: 0.5rem;
  text-align: left;

  svg,
  img {
    width: 2rem;
    height: 2rem;
  }
`

const SplitButtonGroup = styled(ButtonGroup)`
  display: flex;
  width: 100%;

  > button {
    flex: 1;
  }
`

const PIECES = [
  { type: 'WM', label: 'White man' },
  { type: 'WK', label: 'White king' },
  { type: 'BM', label: 'Black man' },
  { type: 'BK', label: 'Black king' },
]

const createEmptyPosition = turn => ({
  turn,
  pieces: new Array(32).fill(null),
  fifteenMoveRule: 0,
  piecesToHuff: [],
})

const isAllowedSquare = (piece, square) => {
  return !((piece === 'WM' && square >= 28) || (piece === 'BM' && square < 4))
}

const PositionEditor = () => {
  const dispatch = useDispatch()
  const fen = useSelector(toFenSelector)
  const { white, black } = useSelector(state => state.gameSettings)
  const [show, setShow] = useState(false)
  const [position, setPosition] = useState(null)
  const [fenInput, setFenInput] = useState('')
  const [selectedPiece, setSelectedPiece] = useState('WM')

  const updatePosition = nextPosition => {
    setPosition(nextPosition)
    setFenInput(toFen(nextPosition))
  }

  const openEditor = () => {
    const currentPosition = fromFen(fen)
    updatePosition(currentPosition)
    setSelectedPiece('WM')
    setShow(true)
  }

  const updatePiece = square => {
    setPosition(current => {
      const pieces = [...current.pieces]
      if (pieces[square] != null) {
        pieces[square] = null
      } else {
        if (!isAllowedSquare(selectedPiece, square)) return current
        pieces[square] = selectedPiece
      }

      const nextPosition = { ...current, pieces, piecesToHuff: [] }
      setFenInput(toFen(nextPosition))
      return nextPosition
    })
  }

  const updateFen = value => {
    setFenInput(value)
    const parsedPosition = fromFen(value)
    if (parsedPosition != null) setPosition(parsedPosition)
  }

  const renderSquare = index => {
    const row = Math.floor(index / 8)
    const column = index % 8
    const playable = (row + column) % 2 === 1
    const square = playable ? row * 4 + Math.floor(column / 2) : null
    const piece = square == null ? null : position.pieces[square]
    const label = square == null ? 'Light square' : `Square ${square + 1}${piece ? `, ${piece}` : ''}`

    return (
      <Square
        key={index}
        type='button'
        $playable={playable}
        disabled={!playable}
        aria-label={label}
        onClick={() => updatePiece(square)}
      >
        {piece && <Piece type={piece} />}
      </Square>
    )
  }

  const handleApply = () => {
    if (!isValidFen(fenInput)) return

    dispatch(newGame(white, black, fenInput))
    setShow(false)
  }

  return (
    <>
      <Modal show={show} onHide={() => setShow(false)} size='lg' centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit position</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {position && (
            <EditorLayout>
              <div>
                <BoardGrid>{Array.from({ length: 64 }, (_, index) => renderSquare(index))}</BoardGrid>
                <FenGroup controlId='position-editor-fen'>
                  <Form.Label>FEN</Form.Label>
                  <div>
                    <Form.Control
                      type='text'
                      value={fenInput}
                      onChange={event => updateFen(event.currentTarget.value)}
                      isInvalid={!isValidFen(fenInput)}
                    />
                  </div>
                </FenGroup>
              </div>
              <Palette>
                <Form.Label className='mb-0'>Place piece</Form.Label>
                {PIECES.map(({ type, label }) => (
                  <PieceButton
                    key={type}
                    type='button'
                    variant={selectedPiece === type ? 'primary' : 'outline-secondary'}
                    onClick={() => setSelectedPiece(type)}
                  >
                    <Piece type={type} />
                    {label}
                  </PieceButton>
                ))}
                <Form.Label className='mb-0'>Side to move</Form.Label>
                <SplitButtonGroup aria-label='Side to move'>
                  <Button
                    type='button'
                    variant={position.turn === 'W' ? 'primary' : 'outline-secondary'}
                    onClick={() => updatePosition({ ...position, turn: 'W' })}
                  >
                    White
                  </Button>
                  <Button
                    type='button'
                    variant={position.turn === 'B' ? 'primary' : 'outline-secondary'}
                    onClick={() => updatePosition({ ...position, turn: 'B' })}
                  >
                    Black
                  </Button>
                </SplitButtonGroup>
                <SplitButtonGroup aria-label='Position actions'>
                  <Button
                    type='button'
                    variant='outline-secondary'
                    onClick={() => updatePosition(createEmptyPosition(position.turn))}
                  >
                    Clear board
                  </Button>
                  <Button
                    type='button'
                    variant='outline-secondary'
                    onClick={() => updatePosition(fromFen(fen))}
                  >
                    Reset position
                  </Button>
                </SplitButtonGroup>
              </Palette>
            </EditorLayout>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button variant='primary' onClick={handleApply} disabled={!isValidFen(fenInput)}>
            Apply position
          </Button>
        </Modal.Footer>
      </Modal>
      <Button type='button' onClick={openEditor}>
        Edit Position
      </Button>
    </>
  )
}

export default PositionEditor