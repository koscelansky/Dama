import _ from 'lodash'

import { GameResult } from './const.js'
import { getPossibleMoves } from './possible-moves.js'

function getPiecesToHuff (board, move, possibleMoves) {
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

      // OK, so we move with a piece, but we need to make sure that move cannot
      // be expanded, if so then return this offending piece
      for (const i of possibleMoves) {
        if (i.length() > move.length() && move.squares.every(x => i.squares.includes(x))) {
          return [move.end()]
        }
      }
    }
  }

  return []
}

export function performMove (board, move, possibleMoves) {
  possibleMoves = possibleMoves || getPossibleMoves(board)

  const { pieces, turn } = board
  let { fifteenMoveRule } = board

  let movedPiece = pieces[move.begin()]
  if (movedPiece == null || movedPiece[0] !== turn) {
    throw new Error('Invalid piece on square ' + move.begin())
  }

  console.log(getPiecesToHuff(board, move, possibleMoves))

  let newPieces = [...board.pieces]
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
    piecesToHuff: []
  }
}

export function getGameResult (board, possibleMoves) {
  possibleMoves = possibleMoves || getPossibleMoves(board)

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

  if (possibleMoves.length === 0) {
    return GameResult.Draw
  }

  return GameResult.InProgress
}
