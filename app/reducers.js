import { ADD_PAWN } from './actions.js'

const initialState = {
  pieces: [
    'WM', 'WM', 'WM', 'WM',
    'WM', 'WM', 'WM', 'WM',
    null, null, null, null, 
    null, null, null, null,
    null, null, null, null,
    null, null, null, null,
    'BM', 'BM', 'BM', 'BM', 
    'BM', 'BM', 'BM', 'BM', 
  ],
  turn: 'W',
}

export default function damaApp(state = initialState, action) {
  switch (action.type) {
    case ADD_PAWN:
      const newPieces = [...state.pieces];
      newPieces[action.square] = 'WM';

      return Object.assign({}, state, {
        pieces: newPieces
      });

    default:
      return state;
  }
}
