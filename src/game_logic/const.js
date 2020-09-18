export const GameResult = Object.freeze({
  Draw: 'draw',
  WhiteWins: 'white-wins',
  BlackWins: 'black-wins',
  InProgress: 'in-progress'
})

export const Color = Object.freeze({
  White: 'W',
  Black: 'B'
})

export const Direction = Object.freeze({
  NE: 0, // up right
  SE: 1, // down right
  SW: 2, // down left
  NW: 3 // up left
})

export const SQUARE_COUNT = 32
