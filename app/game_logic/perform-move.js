import { GameResult } from './const.js'
import { getPossibleMoves, getSquaresBetween } from './possible-moves.js'

function getPiecesToHuff (board, move) {
  const possibleMoves = getPossibleMoves(board).filter(x => x.huff === move.huff)
  const { pieces, turn } = board

  const getPiecesWithCapture = type =>
    pieces.map((x, i) => [x, i])
      .filter(x => x[0] != null && x[0][0] === turn && x[0][1] === type)
      .map(x => x[1])
      .filter(x => possibleMoves.find(move => move.begin() === x && move.isCapture()))

  // iterate through captures from kings (kings has precedence) and then men
  for (const possibleCaptures of ['K', 'M'].map(x => getPiecesWithCapture(x))) {
    if (possibleCaptures.length) {
      if (!possibleCaptures.includes(move.begin())) {
        return possibleCaptures
      }

      // if we do move with piece that can capture, but we do just plain move,
      // then we can huff that piece, but we need to update the current position
      // of that piece
      if (!move.isCapture()) {
        possibleCaptures.splice(possibleCaptures.indexOf(move.begin()), 1)
        possibleCaptures.push(move.end())
        return possibleCaptures
      }

      // OK, so we move with a piece, but we need to make sure that move cannot
      // be expanded, if so then return this offending piece
      for (const i of possibleMoves) {
        if (i.length() > move.length()) {
          // check if move is prefix of i, last square must be check extra
          // because for kings last landing square is not just one (but it is
          // a line)
          let prefix = true
          for (let j = 0; j < move.length() - 1; ++j) {
            if (move.squares[j] !== i.squares[j]) {
              prefix = false
              break
            }
          }

          const last = move.length() - 1
          if (prefix && getSquaresBetween(move.end(), i.squares[last]) != null) {
            return [move.end()]
          }
        }
      }

      return []
    }
  }

  return []
}

export function performMove (board, move) {
  const { pieces, turn } = board
  let { fifteenMoveRule } = board

  let movedPiece = pieces[move.begin()]
  if (movedPiece == null || movedPiece[0] !== turn) {
    throw new Error('Invalid piece on square ' + move.begin())
  }

  let newPieces = [...board.pieces]
  if (move.huff != null) {
    newPieces[move.huff] = null
  }

  newPieces[move.begin()] = null

  if (move.isCapture()) {
    fifteenMoveRule = -1 // reset counter

    // remove from board captured piece
    for (let i of move.getCapturedSquares()) {
      newPieces[i] = null
    }
  }

  if (movedPiece[1] === 'M') {
    fifteenMoveRule = -1 // reset counter

    // handle promotions
    if (movedPiece[0] === 'W' && [28, 29, 30, 31].includes(move.end())) {
      movedPiece = 'WK'
    }
    if (movedPiece[0] === 'B' && [0, 1, 2, 3].includes(move.end())) {
      movedPiece = 'BK'
    }
  }

  newPieces[move.end()] = movedPiece

  return {
    pieces: newPieces,
    turn: board.turn === 'W' ? 'B' : 'W',
    fifteenMoveRule: fifteenMoveRule + 1,
    piecesToHuff: getPiecesToHuff(board, move)
  }
}

export function getGameResult (board) {
  const { pieces, turn, fifteenMoveRule } = board

  if (pieces.find(x => x != null && x[0] === turn) == null) {
    // if current player has no pieces, opponent wins
    return turn === 'W' ? GameResult.BlackWins : GameResult.WhiteWins
  }

  // fifteen move rule is meant for 15 whole rounds (two plies), so to detect
  // draw we need to compare to 30 == 15 * 2
  if (fifteenMoveRule === 30) {
    return GameResult.Draw
  }

  const possibleMoves = getPossibleMoves(board)

  if (possibleMoves.length === 0) {
    return GameResult.Draw
  }

  return GameResult.InProgress
}
