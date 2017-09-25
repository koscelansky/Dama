const Direction = Object.freeze({
  NE: 'NE', // up right
  SE: 'SE', // down right
  SW: 'SW', // down left
  NW: 'NW', // up left
});

class Move {
  constructor(type, squares) {
    this.type = type;
    this.squares = squares;
  }
}

const SQUARE_COUNT = 32;

function getNextSquare(square, direction) {
  if (square < 0 || square >= SQUARE_COUNT)
    throw new Error("Square not in range.");

  const X = null; // just to make lookup more readable
  
  switch (direction) {
    case Direction.NE:
      return [
        X,  X,  X,  X,
        0,  1,  2,  3,
        5,  6,  7,  X,
        8,  9, 10, 11,
        13, 14, 15,  X,
        16, 17, 18, 19,
        21, 22, 23,  X,
        24, 25, 26, 27
      ][square];
    
    case Direction.SE:
      return [
        5,  6,  7,  X,
        8,  9, 10, 11,
        13, 14, 15,  X,
        16, 17, 18, 19,
        21, 22, 23,  X,
        24, 25, 26, 27,
        29, 30, 31,  X,
        X,  X,  X,  X
      ][square];

    case Direction.SW:
      return [
        4,  5,  6,  7,
        X,  8,  9, 10,
        12, 13, 14, 15,
        X, 16, 17, 18,
        20, 21, 22, 23,
        X, 24, 25, 26,
        28, 29, 30, 31,
        X,  X,  X,  X
      ][square];

    case Direction.NW:
      return [
        X,  X,  X,  X,
        X,  0,  1,  2,
        4,  5,  6,  7,
        X,  8,  9, 10,
        12, 13, 14, 15,
        X, 16, 17, 18,
        20, 21, 22, 23,
        X, 24, 25, 26
      ][square];

    default:
      throw new Error("Unknown direction.");
  }
}

function getDirectionForPiece(piece) {
  if (piece[1] == 'K')
    return [Direction.NE, Direction.NW, Direction.SE, Direction.SW];

  if (piece[0] == 'B')
    return [Direction.NE, Direction.NW];

  return [Direction.SE, Direction.SW]
}

function getSimpleMoves(state) {
  let retVal = []; 
  
  const { turn, pieces } = state;
  for (const [index, piece] of pieces.entries()) {
    if (piece === null || piece[0] !== turn)
      continue;

    for (const dir of getDirectionForPiece(piece)) {
      const newPos = getNextSquare(index, dir);
      // if the square exists and is empty
      if (newPos !== null && pieces[newPos] === null) {
        retVal.push(new Move('-', [index, newPos]));
      }
    }
  }
  return retVal;
}

function getPossibleMoves(state) {
  return getSimpleMoves(state);
}


export function canPieceMoveFrom(state, square) {
  const moves = getPossibleMoves(state);

  for (const move of moves) {
    if (move.squares[0] === square)
      return true;
  }

  return false;
}

export function canPieceMoveTo(state, from, to) {
  const moves = getPossibleMoves(state);
  
  for (const move of moves) {
    if (move.squares[0] === from && move.squares[1] === to)
      return true;
  }

  return false;
}
