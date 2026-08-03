import _ from 'lodash'

import { getPossibleMoves } from '../game_logic/possible-moves.js'

export default function* (board) {
  const moves = getPossibleMoves(board)

  yield {
    move: moves[_.random(moves.length - 1)],
    analysis: null,
  }
}
