import { describe, expect, it } from 'vitest'

import { getPossibleMoves } from '../game_logic/possible-moves'
import mainReducer from './index'
import { movePiece, newGame, restoreGame } from './actions'

describe('restoreGame', () => {
  it('restores the board after the selected move and discards later moves', () => {
    const player = { type: 'human', name: 'Human', time: 10, evaluate: 'material-count' }
    let state = mainReducer(undefined, { type: 'test/init' })

    state = mainReducer(state, newGame(player, player, state.gameSettings.fen))
    state = mainReducer(state, movePiece(getPossibleMoves(state.board)[0]))
    const stateAfterFirstMove = state
    state = mainReducer(state, movePiece(getPossibleMoves(state.board)[0]))

    const restoredState = mainReducer(state, restoreGame(1))

    expect(restoredState.board).toEqual(stateAfterFirstMove.board)
    expect(restoredState.moveHistory).toEqual(stateAfterFirstMove.moveHistory)
  })
})
