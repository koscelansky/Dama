import { createSelector } from 'reselect'
import { getPossibleMoves } from './game_logic/possible-moves.js'

export const possibleMovesSelector = createSelector(
  state => state, 
  function (state) {
    return getPossibleMoves(state);
  }
)
