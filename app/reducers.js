import { combineReducers } from 'redux'

import { MOVE_PIECE, NEW_POSITION_FROM_FEN } from './actions.js'
import boardInitialState from './game_logic/board-init.js'
import { performMove } from './game_logic/perform-move.js'
import { fromFen } from './fen.js'

function board (state = boardInitialState, action) {
  switch (action.type) {
    case MOVE_PIECE: {
      const { move } = action

      return performMove(state, move)
    }
    case NEW_POSITION_FROM_FEN: {
      const { fen } = action

      return fromFen(fen) || state
    }
    default: {
      return state
    }
  }
}

function white (state = 'human', action) {
  return state
}

function black (state = 'human', action) {
  return state
}

const mainReducer = combineReducers({
  board,
  white,
  black
})

export default mainReducer
