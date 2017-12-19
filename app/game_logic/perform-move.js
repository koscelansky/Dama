import { Move } from './move.js' 

export function performMove(state, move) {
  const movedPiece = state.pieces[move.begin()];

  state.pieces[move.begin()] = null;
  state.pieces[move.end()] = movedPiece;

  state.turn = state.turn === 'W' ? 'B' : 'W';

  return state;
}