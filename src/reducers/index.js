import { combineReducers } from 'redux'

import gameSettings from './game-settings'
import board from './board'

import { isValidFen } from '../fen.js'

const historyInitialState = {
  fen: null,
  moves: []
}

function history (state = historyInitialState, action) {
  switch (action.type) {
    case 'gameSettings/newGame': {
      if (isValidFen(action.payload.fen)) {
        return { fen: action.payload.fen, moves: [] }
      }
      return state
    }
    case 'board/movePiece': {
      const { payload } = action

      return { ...state, moves: [...state.moves, payload.toString()] }
    }
    default: {
      return state
    }
  }
}

function state (state = 'new', action) {
  switch (action.type) {
    case 'gameSettings/newGame': {
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
  gameSettings,
  history
})

export default mainReducer
