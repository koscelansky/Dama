import { describe, expect, it } from 'vitest'

import { getPossibleMoves } from './possible-moves'

function emptyBoard(turn, piecesToHuff = []) {
  return { turn, pieces: new Array(32).fill(null), piecesToHuff }
}

describe('getPossibleMoves - simple moves', () => {
  it('gives each white man on the starting position 2 or fewer forward moves', () => {
    const board = emptyBoard('W')
    for (let i = 0; i < 8; ++i) board.pieces[i] = 'WM'
    for (let i = 24; i < 32; ++i) board.pieces[i] = 'BM'

    const moves = getPossibleMoves(board)

    expect(moves.length).toBeGreaterThan(0)
    expect(moves.every(m => m.type === '-')).toBe(true)
    expect(moves.every(m => m.length() === 2)).toBe(true)
  })

  it('men cannot move backwards', () => {
    const board = emptyBoard('W')
    board.pieces[20] = 'WM' // somewhere in the middle of the board

    const moves = getPossibleMoves(board)

    // white men only move towards higher indices (SE/SW), never NE/NW
    for (const move of moves) {
      expect(move.end()).toBeGreaterThan(move.begin())
    }
  })

  it('a king can move both forwards and backwards, multiple squares', () => {
    const board = emptyBoard('W')
    board.pieces[13] = 'WK'

    const moves = getPossibleMoves(board)

    expect(moves.some(m => m.end() < m.begin())).toBe(true)
    expect(moves.some(m => m.end() > m.begin())).toBe(true)
    // a man could only reach the immediate diagonal neighbours (9 or 8),
    // a king further away along the same diagonal (e.g. 6, two squares NE)
    expect(moves.some(m => m.end() === 6)).toBe(true)
  })

  it('a man blocked by its own pieces on both forward diagonals has no moves', () => {
    const board = emptyBoard('W')
    board.pieces[13] = 'WM'
    board.pieces[17] = 'WM' // SE neighbour
    board.pieces[16] = 'WM' // SW neighbour

    const moves = getPossibleMoves(board)

    expect(moves.filter(m => m.begin() === 13)).toEqual([])
  })
})

describe('getPossibleMoves - captures', () => {
  it('a man captures a single adjacent enemy piece by jumping over it', () => {
    const board = emptyBoard('W')
    board.pieces[9] = 'WM'
    board.pieces[13] = 'BM'

    const moves = getPossibleMoves(board)
    const captures = moves.filter(m => m.isCapture())

    expect(captures).toHaveLength(1)
    expect(captures[0].squares).toEqual([9, 16])
    expect(captures[0].getCapturedSquares()).toEqual([13])
  })

  it('captures are offered even when a simple move is also available', () => {
    const board = emptyBoard('W')
    board.pieces[9] = 'WM'
    board.pieces[13] = 'BM'

    const moves = getPossibleMoves(board)

    expect(moves.some(m => !m.isCapture())).toBe(true)
    expect(moves.some(m => m.isCapture())).toBe(true)
  })

  it('offers a further jump when the first landing square allows another capture', () => {
    const board = emptyBoard('W')
    board.pieces[9] = 'WM'
    board.pieces[13] = 'BM'
    board.pieces[21] = 'BM'

    const moves = getPossibleMoves(board)
    const captures = moves.filter(m => m.isCapture())

    // stopping after the first capture is still a legal (if riskier) choice,
    // the huffing penalty is what punishes not continuing the multi-jump
    expect(captures.map(m => m.squares)).toContainEqual([9, 16])
    expect(captures.map(m => m.squares)).toContainEqual([9, 16, 25])

    const fullChain = captures.find(m => m.squares.length === 3)
    expect(fullChain.getCapturedSquares().sort()).toEqual([13, 21])
  })

  it('a queen can capture and land on any free square beyond the enemy piece', () => {
    const board = emptyBoard('W')
    board.pieces[9] = 'WK'
    board.pieces[13] = 'BM'

    const moves = getPossibleMoves(board)
    const captures = moves.filter(m => m.isCapture())

    // landing squares 16 and 20 are both free beyond the captured piece on 13
    expect(captures.map(m => m.end()).sort()).toEqual([16, 20])
  })
})

describe('getPossibleMoves - huffing', () => {
  it('offers huff moves in addition to normal moves when a piece can be huffed', () => {
    const board = emptyBoard('W', [24])
    board.pieces[9] = 'WM'
    board.pieces[24] = 'BM'

    const moves = getPossibleMoves(board)

    expect(moves.some(m => m.huff === 24)).toBe(true)
    expect(moves.some(m => m.huff == null)).toBe(true)
  })
})
