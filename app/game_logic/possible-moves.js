export function canPieceMoveFrom(state, square) {
  const piece = state.pieces[square];
  if (piece === null)
    return false;

  if (state.turn === piece[0])
    return true;

  return false;
}

export function canPieceMoveTo(state, from, to) {
  
}
