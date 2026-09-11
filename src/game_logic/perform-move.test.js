import { describe, expect, it } from 'vitest'

import { fromFen } from '../fen'
import { performMove } from './perform-move'
import { getPossibleMoves } from './possible-moves'

describe('performMove - huffing', () => {
  it('makes a queen huffable when it stops before completing a capture chain', () => {
    const board = fromFen('B:W4,11,13,26,K30:B20,21,29,K31')
    const partialCapture = getPossibleMoves(board).find(
      move => move.squares.length === 2 && move.squares[0] === 30 && move.squares[1] === 21
    )

    expect(partialCapture).toBeDefined()

    const nextBoard = performMove(board, partialCapture)

    expect(nextBoard.piecesToHuff).toEqual([21])
  })

  it('makes a queen huffable when it chooses a shorter capture route', () => {
    const board = fromFen('B:WK4,K9,K11,K25:BK5')
    const shortCapture = getPossibleMoves(board).find(move => move.toString() === 'a7xc5')

    expect(shortCapture).toBeDefined()

    const nextBoard = performMove(board, shortCapture)

    expect(nextBoard.piecesToHuff).toEqual([13])
  })

  it('does not make a queen huffable after it completes its chosen capture route', () => {
    const board = fromFen('W:WK5:BK9,K15,K16,K22')
    const completedCapture = getPossibleMoves(board).find(move => move.toString() === 'a7xd4xa1')

    expect(completedCapture).toBeDefined()

    const nextBoard = performMove(board, completedCapture)

    expect(nextBoard.piecesToHuff).toEqual([])
  })

  it('does not make a queen huffable after a completed capture route', () => {
    const board = fromFen('W:WK3:BK6,K7,K18,K24')
    const completedCapture = getPossibleMoves(board).find(move => move.toString() === 'f8xd6xb8')

    expect(completedCapture).toBeDefined()

    const nextBoard = performMove(board, completedCapture)

    expect(nextBoard.piecesToHuff).toEqual([])
  })

  it('makes a queen huffable when another landing continues the same captures', () => {
    const board = fromFen('W:WK4:BK8,K15,K26')
    const partialCapture = getPossibleMoves(board).find(move => move.toString() === 'h8xf6xd4')

    expect(partialCapture).toBeDefined()

    const nextBoard = performMove(board, partialCapture)

    expect(nextBoard.piecesToHuff).toEqual([17])
  })
})
