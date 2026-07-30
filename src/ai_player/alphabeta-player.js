import _ from 'lodash'

import { materialCount, weightedMaterialCount } from './evaluate'
import { getPossibleMoves } from '../game_logic/possible-moves'
import { performMove, getGameResult } from '../game_logic/perform-move'
import { GameResult } from '../game_logic/const'

function negamax(board, depth, alpha, beta, evalFun) {
  const gameResult = getGameResult(board)

  if (depth === 0 || gameResult !== GameResult.InProgress) {
    const whiteSideEval = (() => {
      switch (gameResult) {
        case GameResult.WhiteWins:
          return 100000
        case GameResult.BlackWins:
          return -100000
        case GameResult.Draw:
          return 0
        default:
          return evalFun(board)
      }
    })()

    return board.turn === 'W' ? whiteSideEval : -whiteSideEval
  }

  let max = -Infinity
  for (const i of getPossibleMoves(board)) {
    const nextBoard = performMove(board, i)

    const value = -negamax(nextBoard, depth - 1, -beta, -alpha, evalFun)
    max = Math.max(value, max)
    alpha = Math.max(alpha, value)
    if (alpha >= beta) {
      break
    }
  }

  return max
}

export default function* (board, options) {
  const evalFun = (type => {
    switch (type) {
      case 'weighted-material-count':
        return weightedMaterialCount
      case 'material-count':
      default:
        return materialCount
    }
  })(options.evaluate)

  const possibleMoves = getPossibleMoves(board)
  if (possibleMoves.length === 0) return

  let principalMove = possibleMoves[_.random(possibleMoves.length - 1)]
  yield principalMove

  let depth = 1
  while (depth < 100) {
    // Search the previous iteration's best move first so it establishes a useful root alpha.
    const orderedMoves = [principalMove, ...possibleMoves.filter(move => move !== principalMove)]
    const rankedMoves = []
    let alpha = -Infinity
    let best = null

    for (const i of orderedMoves) {
      const nextBoard = performMove(board, i)

      // Negamax reverses the root window: beta is -alpha and the child has no lower bound.
      const value = -negamax(nextBoard, depth - 1, -Infinity, -alpha, evalFun)
      rankedMoves.push({ move: i, rank: value })

      // If the move is better than the best move so far, update the best move and alpha.
      if (best == null || value > best.rank) {
        best = rankedMoves[rankedMoves.length - 1]
        alpha = value
      }
    }

    // keep the best move for next iteration, so it can
    // develop a better alpha bound for the next iteration
    principalMove = best.move

    console.warn('Alpha beta depth ' + depth + ' best move ' + best.move + ' value ' + best.rank)
    console.warn(rankedMoves.map(x => x.move.toString() + '=' + x.rank).join(' '))
    console.warn()

    yield best.move

    depth++
  }
}
