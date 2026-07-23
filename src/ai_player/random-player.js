import _ from 'lodash'

import { getPossibleMoves } from '../game_logic/possible-moves.js'

export default function* (board) {
  // eslint-disable-line require-yield -- returns its final move immediately
  const moves = getPossibleMoves(board)

  return JSON.stringify(moves[_.random(moves.length - 1)])
}
