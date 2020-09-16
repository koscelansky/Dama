import { createSlice } from '@reduxjs/toolkit'

import boardInitialState from '../game_logic/board-init.js'
import { performMove } from '../game_logic/perform-move.js'
import { fromFen } from '../fen.js'
import { newGame } from './actions'

const board = createSlice({
  name: 'board',
  initialState: boardInitialState,
  reducers: {
    movePiece: (state, action) => {
      return performMove(state, action.payload)
    }
  },
  extraReducers: {
    [newGame]: (_, action) => {
      return fromFen(action.payload.fen) || boardInitialState
    }
  }
})

export const { movePiece } = board.actions

export default board.reducer
