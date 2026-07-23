import { combineReducers } from '@reduxjs/toolkit'

import gameSettings from './game-settings'
import board from './board'
import moveHistory from './move-history'
import globalState from './global-state'
import { withGameRestore } from './restore-game'

const appReducer = combineReducers({
  globalState,
  board,
  gameSettings,
  moveHistory,
})

export default withGameRestore(appReducer)
