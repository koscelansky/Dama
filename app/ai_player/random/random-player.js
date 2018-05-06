import _ from 'lodash'

import { getPossibleMoves } from '../../game_logic/possible-moves.js'

export default function (board) {
  const moves = getPossibleMoves(board)

  return moves[_.random(moves.length - 1)]
}
