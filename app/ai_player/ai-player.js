import evaluate from './evaluate.js'
import { getPossibleMoves } from '../game_logic/possible-moves.js'
import { performMove } from '../game_logic/perform-move.js'

function minmax (board, depth) {
  if (depth === 0) {
    return evaluate(board)
  }

  for (const i of getPossibleMoves(board)) {
    const nextBoard = performMove(board, i)

  }
}

export default function getBestMove (board) {

}
