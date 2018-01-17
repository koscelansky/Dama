import { Move } from './move.js' 

export function performMove(state, move) {
  let movedPiece = state.pieces[move.begin()];
  if (movedPiece == null)
    throw new Error('No piece on square ' + move.begin());

  state.pieces[move.begin()] = null;

  // handle promotions
  if (movedPiece[1] == 'M') {
    if (movedPiece[0] == 'W' && [28, 29, 30, 31].includes(move.end())) {
      movedPiece = 'WK';
    }
    if (movedPiece[0] == 'B' && [0, 1, 2, 3].includes(move.end())) {
      movedPiece = 'BK';
    }
  }

  state.pieces[move.end()] = movedPiece;

  state.turn = state.turn === 'W' ? 'B' : 'W';

  return state;
}