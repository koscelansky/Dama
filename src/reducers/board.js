import { createSlice } from '@reduxjs/toolkit'

import { performMove } from '../game_logic/perform-move.js'
import { fromFen } from '../fen.js'
import { newGame } from './actions'
import { defaultGameSettings } from './game-settings'

const initialState = fromFen(defaultGameSettings.fen)

const board = createSlice({
  name: 'board',
  initialState,
  reducers: {
    movePiece: (state, action) => {
      return performMove(state, action.payload)
    },
  },
  extraReducers: builder => {
    builder.addCase(newGame, (_, action) => {
      return fromFen(action.payload.fen)
    })
  },
})

export const { movePiece } = board.actions

export default board.reducer
