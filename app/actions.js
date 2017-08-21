const MOVE_PIECE = 'MOVE_PIECE';

function movePiece(from, to) {
  return {
    type: MOVE_PIECE,
    from,
    to,
  }
}

export { MOVE_PIECE };

export { movePiece };
