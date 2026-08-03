import { createSlice } from '@reduxjs/toolkit'

import { newGame } from './game-settings'

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
  },
})

export const { toggleMinimaxAnalysis, updateMinimaxAnalysis } = minimaxAnalysis.actions

export default minimaxAnalysis.reducer