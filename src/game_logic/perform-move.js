import { GameResult } from './const'
import { getPossibleMoves } from './possible-moves'
import { Move } from './move'

function getCapturedPieces(board, move) {
  // Kings may pass over empty squares before and after the captured piece.
  // Keep only the opponent pieces that the move actually jumps over.
  return move.getCapturedSquares().filter(square => {
    const piece = board.pieces[square]
    return square !== move.huff && piece != null && piece[0] !== board.turn
  })
}

function getPiecesToHuff(board, move) {
  const possibleMoves = getPossibleMoves(board).filter(x => x.huff === move.huff)
  const { pieces, turn } = board

  const getPiecesWithCapture = type =>
    pieces
      .map((x, i) => [x, i])
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

      // Now we need to make sure, the move (jump) cannot be extended by another
      // capture, otherwise it could be huffable.
      const capturedPieces = getCapturedPieces(board, move)
      for (const i of possibleMoves) {
        // no need to compute captured pieces, if this move does not correspond
        // to current move starting square
        if (i.begin() !== move.begin()) continue
        // A king can use different landing squares after jumping the same piece.
        // Compare the captured pieces instead of landing squares to find an
        // unfinished capture sequence.
        const alternativeCapturedPieces = getCapturedPieces(board, i)
        // if the alternative captured pieces are not more than the current
        // do not even bother to check further
        if (alternativeCapturedPieces.length <= capturedPieces.length) continue
        // now check if the alternative move continues the capture sequence
        const isCaptureContinuation = capturedPieces.every(
          (square, index) => square === alternativeCapturedPieces[index]
        )

        if (isCaptureContinuation) {
          return [move.end()]
        }
      }

      return []
    }
  }

  return []
}

export function performMove(board, moveObj) {
  const move = Move.fromJSObj(moveObj)

  const { pieces, turn } = board
  let { fifteenMoveRule } = board

  let movedPiece = pieces[move.begin()]
  if (movedPiece == null || movedPiece[0] !== turn) {
    throw new Error('Invalid piece on square ' + move.begin())
  }

  const newPieces = [...board.pieces]
  if (move.huff != null) {
    newPieces[move.huff] = null
  }

  newPieces[move.begin()] = null

  if (move.isCapture()) {
    fifteenMoveRule = -1 // reset counter

    // remove from board captured piece
    for (const i of move.getCapturedSquares()) {
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
    piecesToHuff: getPiecesToHuff(board, move),
  }
}

export function getGameResult(board) {
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
