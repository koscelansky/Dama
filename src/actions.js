export const GUI_HUFF_PIECE = 'GUI_HUFF_PIECE'
export const MOVE_PIECE = 'MOVE_PIECE'
export const NEW_GAME = 'NEW_GAME'
export const SHOW_FEN = 'SHOW_FEN'
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

export function newGame (white, black, fen) {
  return {
    type: NEW_GAME,
    white,
    black,
    fen
  }
}

export function showFen () {
  return {
    type: SHOW_FEN
  }
}

export function closeModal () {
  return {
    type: CLOSE_MODAL
  }
}