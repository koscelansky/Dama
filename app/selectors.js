import { createSelector } from 'reselect'
import { getPossibleMoves } from './game_logic/possible-moves.js'
import { toFen } from './fen.js'

export const possibleMovesSelector = createSelector(
  state => state.board,
  function (board) {
    return getPossibleMoves(board)
  }
)

export const getFenSelector = createSelector(
  state => state.board,
  function (board) {
    return toFen(board)
  }
)
