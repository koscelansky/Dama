import { describe, expect, it } from 'vitest'

import { fromFen, toFen, isValidFen } from './fen'

describe('fromFen', () => {
  it('parses turn and pieces for both colors', () => {
    const state = fromFen('W:W1,K2:B24,25')

    expect(state.turn).toBe('W')
    expect(state.pieces[0]).toBe('WM')
    expect(state.pieces[1]).toBe('WK')
    expect(state.pieces[23]).toBe('BM')
    expect(state.pieces[24]).toBe('BM')
    expect(state.fifteenMoveRule).toBe(0)
    expect(state.piecesToHuff).toEqual([])
  })

  it('parses an empty piece list for a color', () => {
    const state = fromFen('B::B24')

    expect(state.turn).toBe('B')
    expect(state.pieces.filter(p => p != null)).toEqual(['BM'])
  })

  it('parses the huffable pieces section', () => {
    const state = fromFen('W:W1,K2:B24,25:X24,25')

    expect(state.piecesToHuff).toEqual([23, 24])
  })

  it('returns null for an invalid turn', () => {
    expect(fromFen('X:W1:B24')).toBeNull()
  })

  it('returns null when a color is repeated', () => {
    expect(fromFen('W:W1:W24')).toBeNull()
  })

  it('returns null for a square out of range', () => {
    expect(fromFen('W:W33:B24')).toBeNull()
    expect(fromFen('W:W0:B24')).toBeNull()
  })

  it('returns null when a square is occupied twice', () => {
    expect(fromFen('W:W1,K1:B24')).toBeNull()
  })

  it('returns null when a man is placed on a forbidden back-rank square', () => {
    expect(fromFen('W:W29:B24')).toBeNull() // white men can't be on 29-32
    expect(fromFen('W:W1:B1')).toBeNull() // black men can't be on 1-4
  })

  it('allows a king on a back-rank square', () => {
    expect(fromFen('W:WK29:B24')).not.toBeNull()
  })

  it('returns null for a malformed huff section', () => {
    expect(fromFen('W:W1:B24:X')).toBeNull()
    expect(fromFen('W:W1:B24:X33')).toBeNull()
  })

  it('returns null for a duplicate huff square', () => {
    expect(fromFen('W:W1:B24,25:X24,24')).toBeNull()
  })

  it('returns null when a huff square does not belong to the opponent', () => {
    expect(fromFen('W:W1:B24:X1')).toBeNull() // belongs to the side to move
    expect(fromFen('W:W1:B24:X5')).toBeNull() // empty square
  })
})

describe('toFen', () => {
  it('round-trips a position without huffable pieces', () => {
    const fen = 'W:W1,K2:B24,25'
    expect(toFen(fromFen(fen))).toBe(fen)
  })

  it('round-trips a position with huffable pieces', () => {
    const fen = 'W:W1,K2:B24,25:X24,25'
    expect(toFen(fromFen(fen))).toBe(fen)
  })

  it('omits the huff section entirely when nothing can be huffed', () => {
    const fen = toFen({ turn: 'W', pieces: new Array(32).fill(null), piecesToHuff: [] })
    expect(fen).toBe('W:W:B')
  })
})

describe('isValidFen', () => {
  it('returns true for valid FEN strings', () => {
    expect(isValidFen('W:W1,K2:B24,25:X24,25')).toBe(true)
  })

  it('returns false for invalid FEN strings', () => {
    expect(isValidFen('not a fen')).toBe(false)
  })
})
