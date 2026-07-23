import { createSlice } from '@reduxjs/toolkit'

export const defaultGameSettings = {
  white: {
    type: 'human',
    name: 'Human',
    time: 10,
    evaluate: 'weighted-material-count',
  },
  black: {
    type: 'ai-minmax',
    name: 'AI',
    time: 10,
    evaluate: 'weighted-material-count',
  },
  fen: 'W:W1,2,3,4,5,6,7,8:B25,26,27,28,29,30,31,32',
}

const gameSettings = createSlice({
  name: 'gameSettings',
  initialState: defaultGameSettings,
  reducers: {
    newGame: {
      reducer: (_, action) => action.payload,
      prepare: (white, black, fen) => ({ payload: { white, black, fen } }),
    },
  },
})

export const { newGame } = gameSettings.actions

export default gameSettings.reducer
