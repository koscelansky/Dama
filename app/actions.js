const ADD_MAN = 'ADD_MAN';

function addPawn(sq) {
  return {
    type: ADD_MAN,
    square: sq,
  }
}

export { ADD_MAN };

export { addPawn };

