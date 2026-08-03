import { combineReducers } from '@reduxjs/toolkit'

import gameSettings from './game-settings'
import board from './board'
import moveHistory from './move-history'
import globalState from './global-state'
import minimaxAnalysis from './minimax-analysis'
import { withGameRestore } from './restore-game'

const appReducer = combineReducers({
  globalState,
  board,
  gameSettings,
  moveHistory,
  minimaxAnalysis,
})

export default withGameRestore(appReducer)
