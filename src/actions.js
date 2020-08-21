export const GUI_HUFF_PIECE = 'GUI_HUFF_PIECE'
export const MOVE_PIECE = 'MOVE_PIECE'
export const CLOSE_MODAL = 'CLOSE_MODAL'

export function guiHuffPiece (square) {
  return {
    type: GUI_HUFF_PIECE,
    square
  }
}

export function movePiece (move) {
  return {
    type: MOVE_PIECE,
    move
  }
}

export function closeModal () {
  return {
    type: CLOSE_MODAL
  }
}
