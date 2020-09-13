import { createSlice } from '@reduxjs/toolkit'

import { newGame, movePiece } from './actions'

const moveHistory = createSlice({
  name: 'moveHistory',
  initialState: [],
  extraReducers: {
    [newGame]: () => [],
    [movePiece]: (state, action) => {
      state.push(action.payload)
    }
  }
})

export default moveHistory.reducer
