import { createSlice } from '@reduxjs/toolkit'

import { Color } from '../game_logic/const'
import { performMove } from '../game_logic/perform-move.js'
import { fromFen } from '../fen.js'
import { newGame } from './actions'

const initialState = {
  pieces: [
    'WM', 'WM', 'WM', 'WM',
    'WM', 'WM', 'WM', 'WM',
    null, null, null, null,
    null, null, null, null,
    null, null, null, null,
    null, null, null, null,
    'BM', 'BM', 'BM', 'BM',
    'BM', 'BM', 'BM', 'BM'
  ],
  turn: Color.White,
  piecesToHuff: [], // pieces that can be huffed by next player
  fifteenMoveRule: 0 // how many moves after last capture, man move
}

const board = createSlice({
  name: 'board',
  initialState,
  reducers: {
    movePiece: (state, action) => {
      return performMove(state, action.payload)
    }
  },
  extraReducers: {
    [newGame]: (_, action) => {
      return fromFen(action.payload.fen) || initialState
    }
  }
})

export const { movePiece } = board.actions

export default board.reducer
