import { createSlice } from '@reduxjs/toolkit'

const gameSettings = createSlice({
  name: 'gameSettings',
  initialState: {
    white: {
      type: 'human',
      name: 'Human',
      time: 10,
      evaluate: 'weighted-material-count'
    },
    black: {
      type: 'ai-minmax',
      name: 'Human',
      time: 10,
      evaluate: 'weighted-material-count'
    },
    fen: ''
  },
  reducers: {
    newGame: {
      reducer: (state, action) => {
        return action.payload
      },
      prepare: (white, black, fen) => ({ payload: { white, black, fen } })
    }
  }
})

export const { newGame } = gameSettings.actions

export default gameSettings.reducer
