import { combineReducers } from 'redux'

import gameSettings from './game-settings'

import {
  MOVE_PIECE
} from '../actions.js'

import boardInitialState from '../game_logic/board-init.js'
import { performMove } from '../game_logic/perform-move.js'
import { fromFen, isValidFen } from '../fen.js'

const historyInitialState = {
  fen: null,
  moves: []
}

function board (state = boardInitialState, action) {
  switch (action.type) {
    case 'gameSettings/newGame': {
      return fromFen(action.payload.fen) || boardInitialState
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

function history (state = historyInitialState, action) {
  switch (action.type) {
    case 'gameSettings/newGame': {
      if (isValidFen(action.payload.fen)) {
        return { fen: action.payload.fen, moves: [] }
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
