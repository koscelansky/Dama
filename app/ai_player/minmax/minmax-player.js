import _ from 'lodash'

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

export default function (board, options = {}) {
  const depth = options.depth || 4
  console.log(options)
  console.log(depth)

  const rankedMoves = []
  for (const i of getPossibleMoves(board)) {
    const nextBoard = performMove(board, i)

    const value = -negamax(nextBoard, depth)
    rankedMoves.push({ move: i, rank: value })
  }

  const bestMoves = rankedMoves.sort((a, b) => b.rank - a.rank)
    .filter((item, idx, array) => item.rank === array[0].rank)

  return bestMoves[_.random(bestMoves.length - 1)].move
}
