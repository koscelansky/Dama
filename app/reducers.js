import { combineReducers } from 'redux'

import { MOVE_PIECE, NEW_POSITION_FROM_FEN, GUI_HUFF_PIECE } from './actions.js'
import boardInitialState from './game_logic/board-init.js'
import { performMove } from './game_logic/perform-move.js'
import { fromFen } from './fen.js'

const humanInitialState = {
  type: 'human',
  name: 'Human'
}

const aiRandomInitialState = {
  type: 'ai-minmax',
  name: 'MinMax'
}

const guiInitialState = {
  huffed: null
}

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

function white (state = humanInitialState, action) {
  return state
}

function black (state = aiRandomInitialState, action) {
  return state
}

function gui (state = guiInitialState, action) {
  switch (action.type) {
    case MOVE_PIECE:
    case NEW_POSITION_FROM_FEN: {
      return guiInitialState
    }
    case GUI_HUFF_PIECE: {
      return { huffed: action.square }
    }
    default: {
      return state
    }
  }
}

const mainReducer = combineReducers({
  board,
  gui,
  white,
  black
})

export default mainReducer
