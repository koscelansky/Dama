import evaluate from './evaluate.js'
import { getPossibleMoves } from '../game_logic/possible-moves.js'
import { performMove } from '../game_logic/perform-move.js'

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
  console.log(negamax(board, 3))
}
