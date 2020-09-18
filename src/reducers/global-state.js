import { createSlice } from '@reduxjs/toolkit'

import { newGame } from './actions'

export const GlobalState = Object.freeze({
  New: 'new',
  InProgress: 'in-progress'
})

const globalState = createSlice({
  name: 'globalState',
  initialState: GlobalState.New,
  extraReducers: {
    [newGame]: () => {
      return GlobalState.InProgress
    }
  }
})

export default globalState.reducer
