import { getPossibleMoves } from './possible-moves.js'

export function performMove (board, move) {
  const { pieces, turn } = board

  let movedPiece = pieces[move.begin()]
  if (movedPiece == null || movedPiece[0] !== turn) {
    throw new Error('Invalid piece on square ' + move.begin())
  }

  let newPieces = [...board.pieces]
  newPieces[move.begin()] = null

  if (move.isCapture()) {
    for (let i of move.getCapturedSquares()) {
      newPieces[i] = null // remove from board captured piece
    }
  }

  // handle promotions
  if (movedPiece[1] === 'M') {
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

  return newBoard
}

const GameResult = Object.freeze({
  Draw: 'draw',
  WhiteWins: 'white-wins',
  BlackWins: 'black-wins',
  InProgress: 'in-progress'
})

export function getResult (board) {
  const { pieces, turn } = board

  if (pieces.find(x => x != null && x[0] === turn) == null) {
    // if current player has no pieces, opponent wins
    return turn === 'W' ? GameResult.BlackWins : GameResult.WhiteWins
  }

  if (getPossibleMoves(board).length === 0) {
    return GameResult.Draw
  }
}
