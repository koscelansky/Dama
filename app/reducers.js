import { combineReducers } from 'redux'

import {
  MOVE_PIECE,
  GUI_HUFF_PIECE,
  NEW_GAME
} from './actions.js'

import boardInitialState from './game_logic/board-init.js'
import { performMove } from './game_logic/perform-move.js'
import { fromFen } from './fen.js'

const whiteInitialState = {
  type: 'human',
  name: 'Human',
  time: 10,
  alphaBeta: false
}

const blackInitialState = {
  type: 'ai-minmax',
  name: 'Human',
  time: 10,
  alphaBeta: false
}

const guiInitialState = {
  huffed: null
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

function pageLoad (state = true, action) {
  switch (action.type) {
    case NEW_GAME: {
      return false
    }
    default: {
      return state
    }
  }
}

const mainReducer = combineReducers({
  pageLoad,
  board,
  gui,
  white,
  black
})

export default mainReducer
