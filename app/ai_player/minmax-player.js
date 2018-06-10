import _ from 'lodash'

import evaluate from './eval/evaluate'
import { getPossibleMoves } from '../game_logic/possible-moves'
import { performMove } from '../game_logic/perform-move'

function negamax (board, depth, alpha, beta) {
  if (depth === 0) {
    const evaluation = evaluate(board)
    return board.turn === 'W' ? evaluation : -evaluation
  }

  let max = -Infinity
  for (const i of getPossibleMoves(board)) {
    const nextBoard = performMove(board, i)

    const value = -negamax(nextBoard, depth - 1, -beta, -alpha)
    max = Math.max(value, max)
    alpha = Math.max(alpha, value)
    if (alpha >= beta) {
      break
    }
  }

  return max
}

export default function * (board) {
  let depth = 1
  while (depth < 100) {
    const rankedMoves = []
    for (const i of getPossibleMoves(board)) {
      const nextBoard = performMove(board, i)

      const value = -negamax(nextBoard, depth - 1, -Infinity, Infinity)
      rankedMoves.push({ move: i, rank: value })
    }

    const highestRank = _.maxBy(rankedMoves, x => x.rank).rank

    const bestMoves = rankedMoves.filter(x => x.rank === highestRank)

    const best = bestMoves[_.random(bestMoves.length - 1)]

    console.log('Finished depth ' + depth + ' best move ' + best.move + ' value ' + best.rank)
    console.log(bestMoves)

    yield JSON.stringify(best.move)

    depth++
  }
}
