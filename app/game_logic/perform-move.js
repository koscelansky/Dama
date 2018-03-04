import { GameResult } from './const.js'
import { getPossibleMoves } from './possible-moves.js'

export function performMove (board, move) {
  const { pieces, turn } = board
  let { fifteenMoveRule } = board

  let movedPiece = pieces[move.begin()]
  if (movedPiece == null || movedPiece[0] !== turn) {
    throw new Error('Invalid piece on square ' + move.begin())
  }

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

  let newBoard = { pieces: newPieces }

  newBoard.turn = board.turn === 'W' ? 'B' : 'W'
  newBoard.fifteenMoveRule = fifteenMoveRule + 1

  return newBoard
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
