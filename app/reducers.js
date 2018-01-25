import { MOVE_PIECE } from './actions.js'
import initialState from './game_logic/initial-state.js'
import { performMove } from './game_logic/perform-move.js'

export default function damaApp (state = initialState, action) {
  switch (action.type) {
    case MOVE_PIECE:
      const { move } = action

      // copy state
      let newState = JSON.parse(JSON.stringify(state))

      return performMove(newState, move)

    default:
      return state
  }
}
