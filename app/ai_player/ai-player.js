import evaluate from './evaluate.js'
import { getPossibleMoves } from '../game_logic/possible-moves.js'
import { performMove } from '../game_logic/perform-move.js'

function minmax (board, depth, color) {
  if (depth === 0) {
    return evaluate(board)
  }

  let bestValue = -Infinity
  for (const i of getPossibleMoves(board)) {
    const nextBoard = performMove(board, i)

  }
}

export default function getBestMove (board) {
  console.log(minmax(board, 3, 1))
}
