import { createAction } from '@reduxjs/toolkit'

import { fromFen } from '../fen'
import { performMove } from '../game_logic/perform-move'

export const restoreGame = createAction('game/restore')

export function withGameRestore(reducer) {
	return (state, action) => {
		if (!restoreGame.match(action)) {
			return reducer(state, action)
		}

		const moves = state.moveHistory.slice(0, action.payload)
		let board = fromFen(state.gameSettings.fen)

		for (const move of moves) {
			board = performMove(board, move)
		}

		return { ...state, board, moveHistory: moves }
	}
}
