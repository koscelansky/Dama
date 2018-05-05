import evaluate from './evaluate'
import { getPossibleMoves } from '../../game_logic/possible-moves'
import { performMove } from '../../game_logic/perform-move'

function negamax (board, depth) {
  if (depth === 0) {
    return evaluate(board)
  }

  let max = -Infinity
  for (const i of getPossibleMoves(board)) {
    const nextBoard = performMove(board, i)

    const value = -negamax(nextBoard, depth - 1)
    if (value > max) {
      max = value
    }
  }

  return max
}

export default function getBestMove (board) {
  let max = -Infinity
  let bestMove = null
  for (const i of getPossibleMoves(board)) {
    const nextBoard = performMove(board, i)

    const value = -negamax(nextBoard, 4)
    if (value > max) {
      max = value
      bestMove = i
    }
  }

  return bestMove
}
