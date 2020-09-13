import { createSelector } from 'reselect'
import { getPossibleMoves } from './game_logic/possible-moves.js'
import { getGameResult } from './game_logic/perform-move.js'
import { toFen } from './fen.js'

export const possibleMovesSelector = createSelector(
  state => state.board,
  board => getPossibleMoves(board)
)

export const toFenSelector = createSelector(
  state => state.board,
  board => toFen(board)
)

export const gameResultSelector = createSelector(
  state => state.board,
  board => getGameResult(board)
)

export const firstPlayer = createSelector(
  state => state.gameSettings.fen,
  fen => fen[0]
)
