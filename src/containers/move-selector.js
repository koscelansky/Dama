
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Board from '../features/board'

import { movePiece } from '../reducers/actions'
import { possibleMovesSelector, gameResultSelector } from '../selectors'
import { GameResult } from '../game_logic/const'

const MoveSelector = () => {
  const dispatch = useDispatch()

  const handlePieceMove = (move) => {
    dispatch(movePiece(move.toJSObj()))
  }

  const moves = useSelector(possibleMovesSelector)
  const pieces = useSelector(state => state.board.pieces)
  const readonly = useSelector(state => {
    const player = state.board.turn === 'W' ? 'white' : 'black'
    const result = gameResultSelector(state)

    return state.gameSettings[player].type !== 'human' || result !== GameResult.InProgress
  })

  return (
    <Board
      onPieceMove={handlePieceMove}
      moves={moves}
      active={!readonly}
      pieces={pieces}
    />
  )
}

export default MoveSelector
