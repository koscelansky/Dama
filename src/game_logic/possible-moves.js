import _ from 'lodash'

import { Move } from './move.js'

const Direction = Object.freeze({
  NE: 'NE', // up right
  SE: 'SE', // down right
  SW: 'SW', // down left
  NW: 'NW' // up left
})

const SQUARE_COUNT = 32

function getOppositeDirection (direction) {
  switch (direction) {
    case Direction.NE:
      return Direction.SW
    case Direction.NW:
      return Direction.SE
    case Direction.SE:
      return Direction.NW
    case Direction.SW:
      return Direction.NE
    default:
      throw new Error('Unknow direction!')
  }
}

function getNextSquare (square, direction) {
  if (square < 0 || square >= SQUARE_COUNT) {
    throw new Error('Square not in range.')
  }

  const X = null // just to make lookup more readable

  switch (direction) {
    case Direction.NE:
      return [
        X, X, X, X,
        0, 1, 2, 3,
        5, 6, 7, X,
        8, 9, 10, 11,
        13, 14, 15, X,
        16, 17, 18, 19,
        21, 22, 23, X,
        24, 25, 26, 27
      ][square]

    case Direction.SE:
      return [
        5, 6, 7, X,
        8, 9, 10, 11,
        13, 14, 15, X,
        16, 17, 18, 19,
        21, 22, 23, X,
        24, 25, 26, 27,
        29, 30, 31, X,
        X, X, X, X
      ][square]

    case Direction.SW:
      return [
        4, 5, 6, 7,
        X, 8, 9, 10,
        12, 13, 14, 15,
        X, 16, 17, 18,
        20, 21, 22, 23,
        X, 24, 25, 26,
        28, 29, 30, 31,
        X, X, X, X
      ][square]

    case Direction.NW:
      return [
        X, X, X, X,
        X, 0, 1, 2,
        4, 5, 6, 7,
        X, 8, 9, 10,
        12, 13, 14, 15,
        X, 16, 17, 18,
        20, 21, 22, 23,
        X, 24, 25, 26
      ][square]

    default:
      throw new Error('Unknown direction.')
  }
}

function getDirectionForPiece (piece) {
  if (piece[1] === 'K') {
    return [Direction.NE, Direction.NW, Direction.SE, Direction.SW]
  } else if (piece[0] === 'B') {
    return [Direction.NE, Direction.NW]
  } else {
    return [Direction.SE, Direction.SW]
  }
}

function getSimpleMoves (board) {
  const result = []

  const { turn, pieces } = board
  for (const [index, piece] of pieces.entries()) {
    if (piece == null || piece[0] !== turn) continue

    for (const dir of getDirectionForPiece(piece)) {
      let newPos = index
      while (true) {
        newPos = getNextSquare(newPos, dir)

        if (newPos == null || pieces[newPos] != null) break // either piece is blocking path or edge of board

        result.push(new Move('-', [index, newPos]))

        if (piece[1] === 'M') break // only kings can move more than one square
      }
    }
  }
  return result
}

function getFirstEnemyInDirection (pieces, position, piece, direction) {
  while (true) {
    position = getNextSquare(position, direction)
    if (position == null) return null

    const enemy = pieces[position]
    if (enemy == null) {
      if (piece[1] === 'M') return null
    } else {
      if (enemy[0] === piece[0]) {
        return null
      } else {
        return position
      }
    }
  }
}

function getCapturesInternal (pieces, position, piece, lastDirection) {
  const result = []

  for (const dir of getDirectionForPiece(piece)) {
    if (dir === lastDirection) continue // this direcion is forbidden

    const enemyPos = getFirstEnemyInDirection(pieces, position, piece, dir)
    if (enemyPos == null) continue // no piece to capture

    let landingPos = enemyPos
    while (true) {
      landingPos = getNextSquare(landingPos, dir)

      if (landingPos == null || pieces[landingPos] != null) break // no place for piece to land

      result.push([landingPos])

      const newPieces = [...pieces]
      // we removed the piece, this is done by rather big hack, if we just assign
      // null than for multiple captures it will appear as empty and queen could
      // land there, and that is against the rules, as pieces are removed after
      // whole move is completed and it is forbidden to jump over one piece more
      // than once, by assigning the same color as capturing piece effectively
      // forbid this, X is then just a placeholder to make it 2 chars long
      newPieces[enemyPos] = piece[0] + 'X'

      const captures = getCapturesInternal(newPieces, landingPos, piece, getOppositeDirection(dir))

      if (captures.length !== 0) {
        for (const i of captures) {
          i.unshift(landingPos)
        }

        result.push(...captures)
      }

      if (piece[1] === 'M') break // men can only land one square after enemy
    }
  }

  return result
}

function getCaptures (board) {
  const captures = []

  const { turn, pieces } = board
  for (const [index, piece] of pieces.entries()) {
    if (piece == null || piece[0] !== turn) continue

    const moreCaptures = getCapturesInternal(pieces, index, piece, null)
    for (const i of moreCaptures) {
      i.unshift(index)
    }

    captures.push(...moreCaptures)
  }

  const result = []
  for (const i of captures) {
    result.push(new Move('x', i))
  }

  return result
}

export function getPossibleMoves (board) {
  board = _.clone(board)

  let result = [...getSimpleMoves(board), ...getCaptures(board)]
  for (const i of board.piecesToHuff) {
    board.pieces = [...board.pieces]
    board.pieces[i] = null

    const moves = [...getSimpleMoves(board), ...getCaptures(board)]

    result = result.concat(moves.map(
      x => Object.assign(Object.create(Object.getPrototypeOf(x)), x, { huff: i })
    ))
  }
  return result
}

export function getSquaresBetween (from, to) {
  for (const dir of [Direction.NE, Direction.NW, Direction.SE, Direction.SW]) {
    let square = from
    const result = []

    while (square != null) {
      square = getNextSquare(square, dir)

      if (square === to) {
        return result
      }

      result.push(square)
    }
  }

  return null
}
