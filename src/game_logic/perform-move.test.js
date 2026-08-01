import { describe, expect, it } from 'vitest'

import { fromFen } from '../fen'
import { performMove } from './perform-move'
import { getPossibleMoves } from './possible-moves'

describe('performMove - huffing', () => {
  it('makes a queen huffable when it stops before completing a capture chain', () => {
    const board = fromFen('B:W4,11,13,26,K30:B20,21,29,K31')
    const partialCapture = getPossibleMoves(board).find(move =>
      move.squares.length === 2 && move.squares[0] === 30 && move.squares[1] === 21
    )

    expect(partialCapture).toBeDefined()

    const nextBoard = performMove(board, partialCapture)

    expect(nextBoard.piecesToHuff).toEqual([21])
  })
})