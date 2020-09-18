import { combineReducers } from 'redux'

import gameSettings from './game-settings'
import board from './board'
import moveHistory from './move-history'
import globalState from './global-state'

const mainReducer = combineReducers({
  globalState,
  board,
  gameSettings,
  moveHistory
})

export default mainReducer
