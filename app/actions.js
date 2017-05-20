const ADD_PAWN = 'ADD_PAWN';

function addPawn(sq) {
  return {
    type: ADD_PAWN,
    square: sq,
  }
}

export { ADD_PAWN };

export { addPawn };

