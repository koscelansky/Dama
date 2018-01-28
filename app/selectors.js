import { createSelector } from 'reselect'
import { getPossibleMoves } from './game_logic/possible-moves.js'
import { toFen } from './fen.js'

export const possibleMovesSelector = createSelector(
  state => state,
  function (state) {
    return getPossibleMoves(state)
  }
)

export const getFenSelector = createSelector(
  state => state,
  function (state) {
    return toFen(state)
  }
)
