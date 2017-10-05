import { MOVE_PIECE } from './actions.js'
import initialState from './game_logic/initial-state.js'
import { Move } from './game_logic/move.js';

export default function damaApp(state = initialState, action) {
  switch (action.type) {
    case MOVE_PIECE: 
      const { move } = action;

      const newPieces = [...state.pieces];
      const movedPiece = newPieces[move.begin()];

      newPieces[move.begin()] = null;
      newPieces[move.end()] = movedPiece;

      const nextTurn = state.turn === 'B' ? 'W' : 'B';

      return Object.assign({}, state, {
        pieces: newPieces, 
        turn: nextTurn
      });

    default:
      return state;
  }
}
