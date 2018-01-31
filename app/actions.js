export const MOVE_PIECE = 'MOVE_PIECE'
export const NEW_POSITION_FROM_FEN = 'NEW_POSITION_FROM_FEN'

export function movePiece (move) {
  return {
    type: MOVE_PIECE,
    move
  }
}

export function newPositionFromFen (fen) {
  return {
    type: NEW_POSITION_FROM_FEN,
    fen
  }
}
