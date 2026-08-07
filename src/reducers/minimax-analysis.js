import { createSlice } from '@reduxjs/toolkit'

import { newGame } from './game-settings'
import { restoreGame } from './restore-game'

const initialState = {
  enabled: false,
  latest: null,
}

const minimaxAnalysis = createSlice({
  name: 'minimaxAnalysis',
  initialState,
  reducers: {
    toggleMinimaxAnalysis: state => {
      state.enabled = !state.enabled
    },
    updateMinimaxAnalysis: (state, action) => {
      state.latest = action.payload
    },
  },
  extraReducers: builder => {
    builder.addCase(newGame, () => initialState)
    // restoring to an earlier move invalidates analysis computed for a later position
    builder.addCase(restoreGame, state => {
      state.latest = null
    })
  },
})

export const { toggleMinimaxAnalysis, updateMinimaxAnalysis } = minimaxAnalysis.actions

export default minimaxAnalysis.reducer