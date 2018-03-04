import { createSelector } from 'reselect'
import { getPossibleMoves } from './game_logic/possible-moves.js'
import { getGameResult } from './game_logic/perform-move.js'
import { toFen } from './fen.js'

export const possibleMovesSelector = createSelector(
  state => state.board,
  function (board) {
    return getPossibleMoves(board)
  }
)

export const toFenSelector = createSelector(
  state => state.board,
  function (board) {
    return toFen(board)
  }
)

export const gameResultSelector = createSelector(
  [ state => state.board, possibleMovesSelector ],
  (board, possibleMoves) => {
    return getGameResult(board, possibleMoves)
  }
)
