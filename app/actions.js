const MOVE_PIECE = 'MOVE_PIECE'

function movePiece (move) {
  return {
    type: MOVE_PIECE,
    move
  }
}

export { MOVE_PIECE }

export { movePiece }
