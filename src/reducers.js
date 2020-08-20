import { combineReducers } from 'redux'

import {
  MOVE_PIECE,
  GUI_HUFF_PIECE,
  NEW_GAME
} from './actions.js'

import boardInitialState from './game_logic/board-init.js'
import { performMove } from './game_logic/perform-move.js'
import { fromFen, isValidFen } from './fen.js'

const whiteInitialState = {
  type: 'human',
  name: 'Human',
  time: 10,
  evaluate: 'weighted-material-count'
}

const blackInitialState = {
  type: 'ai-minmax',
  name: 'Human',
  time: 10,
  evaluate: 'weighted-material-count'
}

const guiInitialState = {
  huffed: null
}

const historyInitialState = {
  fen: null,
  moves: []
}

function board (state = boardInitialState, action) {
  switch (action.type) {
    case NEW_GAME: {
      return fromFen(action.fen) || boardInitialState
    }
    case MOVE_PIECE: {
      const { move } = action

      return performMove(state, move)
    }
    default: {
      return state
    }
  }
}

function white (state = whiteInitialState, action) {
  switch (action.type) {
    case NEW_GAME: {
      return action.white
    }
    default: {
      return state
    }
  }
}

function black (state = blackInitialState, action) {
  switch (action.type) {
    case NEW_GAME: {
      return action.black
    }
    default: {
      return state
    }
  }
}

function gui (state = guiInitialState, action) {
  switch (action.type) {
    case NEW_GAME:
    case MOVE_PIECE: {
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

function history (state = historyInitialState, action) {
  switch (action.type) {
    case NEW_GAME: {
      if (isValidFen(action.fen)) {
        return { fen: action.fen, moves: [] }
      }
      return state
    }
    case MOVE_PIECE: {
      const { move } = action

      return { ...state, moves: [...state.moves, move.toString()] }
    }
    default: {
      return state
    }
  }
}

function state (state = 'new', action) {
  switch (action.type) {
    case NEW_GAME: {
      if (state !== 'new' && state !== 'in-progress') {
        throw new Error('Only new and in progress can be restarted.')
      }
      return 'in-progress'
    }
    default: {
      return state
    }
  }
}

const mainReducer = combineReducers({
  state,
  board,
  gui,
  white,
  black,
  history
})

export default mainReducer
