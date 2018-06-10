import _ from 'lodash'

import evaluate from './eval/evaluate'
import { getPossibleMoves } from '../game_logic/possible-moves'
import { performMove } from '../game_logic/perform-move'

function negamax (board, depth) {
  if (depth === 0) {
    const evaluation = evaluate(board)
    return board.turn === 'W' ? evaluation : -evaluation
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

export default function * (board, options = {}) {
  let depth = 1
  while (depth < 100) {
    const rankedMoves = []
    for (const i of getPossibleMoves(board)) {
      const nextBoard = performMove(board, i)

      const value = -negamax(nextBoard, depth - 1)
      rankedMoves.push({ move: i, rank: value })
    }

    const bestMoves = rankedMoves.sort((a, b) => b.rank - a.rank)
      .filter((item, idx, array) => item.rank === array[0].rank)

    const best = bestMoves[_.random(bestMoves.length - 1)]

    console.log('Finished depth ' + depth + ' best move ' + best.move + ' value ' + best.rank)

    yield JSON.stringify(best.move)

    depth++
  }
}
