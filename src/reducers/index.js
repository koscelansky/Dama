import { combineReducers } from 'redux'

import gameSettings from './game-settings'
import board from './board'
import moveHistory from './move-history'

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
  moveHistory
})

export default mainReducer
