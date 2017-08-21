import { MOVE_PIECE } from './actions.js'
import initialState from './game_logic/initial-state.js'


export default function damaApp(state = initialState, action) {
  switch (action.type) {
    case MOVE_PIECE:
      // square numbers are 1 based 
      const from = action.from - 1;
      const to = action.to - 1;

      const newPieces = [...state.pieces];
      const movedPiece = newPieces[from];

      newPieces[from] = null;
      newPieces[to] = movedPiece;

      return Object.assign({}, state, {
        pieces: newPieces
      });

    default:
      return state;
  }
}
