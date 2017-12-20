// @flow

export type Piece = 'WM' | 'BM' | 'WK' | 'BK';

export type State = {
  pieces: (?Piece)[], 
  turn: 'W' | 'B'
};

const initialState: State = {
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

export default initialState;