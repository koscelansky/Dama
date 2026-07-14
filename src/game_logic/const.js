export const GameResult = Object.freeze({
  Draw: 'draw',
  WhiteWins: 'white-wins',
  BlackWins: 'black-wins',
  InProgress: 'in-progress',
})

export const Color = Object.freeze({
  White: 'W',
  Black: 'B',
})

export const Direction = Object.freeze({
  NE: 0, // up right
  SE: 1, // down right
  SW: 2, // down left
  NW: 3, // up left
})

export const SQUARE_COUNT = 32

export const squareToAlgebraic = squareNum => {
  const row = Math.floor(squareNum / 4)
  const colInRow = squareNum % 4
  const column = row % 2 === 0 ? colInRow * 2 + 1 : colInRow * 2
  const file = String.fromCharCode(97 + column) // 'a' = 97
  const rank = 8 - row
  return file + rank
}
