import { MOVE_PIECE, NEW_POSITION_FROM_FEN } from './actions.js'
import initialState from './game_logic/initial-state.js'
import { performMove } from './game_logic/perform-move.js'
import { fromFen } from './fen.js'

export default function damaApp (state = initialState, action) {
  switch (action.type) {
    case MOVE_PIECE: {
      const { move } = action

      return Object.assign({}, state, { board: performMove(state.board, move)})
    }
    case NEW_POSITION_FROM_FEN: {
      const { fen } = action

      return Object.assign({}, state, {board: fromFen(fen) || state.board})
    }
    default: {
      return state
    }
  }
}
