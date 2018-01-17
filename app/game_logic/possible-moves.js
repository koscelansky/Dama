import { Move } from './move.js' 

const Direction = Object.freeze({
  NE: 'NE', // up right
  SE: 'SE', // down right
  SW: 'SW', // down left
  NW: 'NW', // up left
});

const SQUARE_COUNT = 32;

function getOppositeDirection(direction) {
  switch (direction) {
    case Direction.NE:
      return Direction.SW;
    case Direction.NW:
      return Direction.SE;
    case Direction.SE:
      return Direction.NW;
    case Direction.SW:
      return Direction.NE;
  }

  throw new Error("Unknow direction!");
}

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
  let result = []; 
  
  const { turn, pieces } = state;
  for (const [index, piece] of pieces.entries()) {
    if (piece == null || piece[0] !== turn)
      continue;

    for (const dir of getDirectionForPiece(piece)) {
      let newPos = index;
      while (true) {
        newPos = getNextSquare(newPos, dir);
        
        if (newPos == null || pieces[newPos] != null) 
          break; // either piece is blocking path or edge of board 

        result.push(new Move('-', [index, newPos]));

        if (piece[1] === 'M') // only kings can move more than one square 
          break;
      }
    }
  }
  return result;
}

function getFirstEnemyInDirection(pieces, position, piece, direction) {
  while (true) {
    position = getNextSquare(position, direction);
    if (position == null)
      return null;

    const enemy = pieces[position];
    if (enemy == null) {
      if (piece[1] == 'M')
        return null;
    } else {
      if (enemy[0] == piece[0])
        return null;
      else 
        return position;
    }
  }
}

function getCapturesInternal(pieces, position, piece, lastDirection) {
  let result = [];

  for (const dir of getDirectionForPiece(piece)) {
    if (dir == lastDirection)
      continue; // this direcion is forbidden
    
    let enemyPos = getFirstEnemyInDirection(pieces, position, piece, dir);
    if (enemyPos == null)
      continue; // no piece to capture

    let landingPos = enemyPos;
    while (true) {
      landingPos = getNextSquare(landingPos, dir);

      if (landingPos == null || pieces[landingPos] != null) 
        break;  // no place for piece to land
    
      let newPieces = [...pieces];
      newPieces[enemyPos] = null; // we removed the piece 

      let captures = getCapturesInternal(newPieces, landingPos, piece, getOppositeDirection(dir));
      if (captures.length == 0) {
        result.push([landingPos]);
      } else {
        for (let i of captures) {
          i.unshift(landingPos);
        }

        result.push(...captures);
      }

      if (piece[1] == 'M')
        break; // men can only land one square after enemy
    } 
  }

  return result;
}

function getCaptures(state) {
  let result = [];

  const { turn, pieces } = state;
  for (const [index, piece] of pieces.entries()) {
    if (piece == null || piece[0] !== turn)
      continue;

    let captures = getCapturesInternal(pieces, index, piece, null);
    for (let i of captures) {
      i.unshift(index);
    }

    result.push(...captures);
  }

  return result;
}

export function getPossibleMoves(state) {
  console.log(getCaptures(state))

  return getSimpleMoves(state);
}
