import _ from 'lodash'

import { materialCount, weightedMaterialCount } from './evaluate'
import { getPossibleMoves } from '../game_logic/possible-moves'
import { performMove, getGameResult } from '../game_logic/perform-move'
import { GameResult } from '../game_logic/const'

function negamax (board, depth, evalFun) {
  const gameResult = getGameResult(board)

  if (depth === 0 || gameResult !== GameResult.InProgress) {
    const whiteSideEval = (() => {
      switch (gameResult) {
        case GameResult.WhiteWins: return 100000
        case GameResult.BlackWins: return -100000
        case GameResult.Draw: return 0
        default: return evalFun(board)
      }
    })()

    return board.turn === 'W' ? whiteSideEval : -whiteSideEval
  }

  let max = -Infinity
  for (const i of getPossibleMoves(board)) {
    const nextBoard = performMove(board, i)

    const value = -negamax(nextBoard, depth - 1, evalFun)
    max = Math.max(value, max)
  }

  return max
}

export default function * (board, options) {
  const evalFun = (type => {
    switch (type) {
      case 'weighted-material-count': return weightedMaterialCount
      case 'material-count':
      default: return materialCount
    }
  })(options.evaluate)

  let depth = 1
  while (depth < 100) {
    const rankedMoves = []
    for (const i of getPossibleMoves(board)) {
      const nextBoard = performMove(board, i)

      const value = -negamax(nextBoard, depth - 1, evalFun)
      rankedMoves.push({ move: i, rank: value })
    }

    const highestRank = _.maxBy(rankedMoves, x => x.rank).rank

    const bestMoves = rankedMoves.filter(x => x.rank === highestRank)

    const best = bestMoves[_.random(bestMoves.length - 1)]

    console.log('Min max depth ' + depth + ' best move ' + best.move + ' value ' + best.rank)
    console.log(bestMoves.map(x => x.move.toString() + '=' + x.rank).join(' '))
    console.log()

    yield JSON.stringify(best.move)

    depth++
  }
}
