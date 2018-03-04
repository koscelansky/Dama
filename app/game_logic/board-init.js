const boardInit = {
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
  turn: 'W', // W for white, B for black
  fifteenMoveRule: 0 // how many moves after last capture, man move
}

export default boardInit
