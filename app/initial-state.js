const initialState = {
  board: {
    pieces: [
      'WM', 'WM', 'WM', 'WM',
      'WM', 'WM', 'WM', 'WM',
      null, null, null, null,
      null, null, null, null,
      null, null, null, null,
      null, null, null, null,
      'BM', 'BM', 'BM', 'BM',
      'BM', 'BM', 'BM', 'BM'
    ],
    turn: 'W'
  },
  white: 'human',
  black: 'human'
}

export default initialState
