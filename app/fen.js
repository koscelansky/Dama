// FEN format is described here https://en.wikipedia.org/wiki/Portable_Draughts_Notation
// [FEN "[Turn]:[Color 1][K][Square number][,]...]:[Color 2][K][Square number][,]...]"]

export function toFen (state) {
  const getPieces = (color) => {
    let result = []

    for (const [i, value] of state.pieces.entries()) {
      if (value != null && value[0] === color) {
        const piecePrefix = value[1] === 'K' ? 'K' : ''
        result.push(piecePrefix + (i + 1))
      }
    }

    return result
  }

  const whitePieces = 'W' + getPieces('W').join(',')
  const blackPieces = 'B' + getPieces('B').join(',')

  return state.turn + ':' + whitePieces + ':' + blackPieces
}

export function fromFen (fen) {
  const parts = fen.split(':')

  if (parts.length !== 3) return null

  const turn = parts[0]
  if (turn.length !== 1 || (turn[0] !== 'B' && turn[0] !== 'W')) return null

  let pieces = new Array(32).fill(null)
  let lastColor = null

  for (let i of [1, 2]) {
    const p = parts[i]

    if (p === '') continue

    if (p[0] !== 'B' && p[0] !== 'W') return null

    if (p[0] === lastColor) return null

    lastColor = p[0]

    const positions = p.substring(1).split(',')
    if (positions.length > 8) return null

    for (let j of positions) {
      if (j === '') return null

      let type = 'M'
      if (j[0] === 'K') {
        type = 'K'
        j = j.substring(1)
      }

      const pos = (+j) - 1

      if (isNaN(pos) || pos < 0 || pos >= 32) return null

      if (pieces[pos] !== null) return null

      const forbiddenPosForMen = {
        'B': [0, 1, 2, 3],
        'W': [28, 29, 30, 31]
      }[lastColor]

      if (type === 'M' && forbiddenPosForMen.includes(pos)) return null

      pieces[pos] = lastColor + type
    }
  }

  return { turn: turn, pieces: pieces }
}

export function isValidFen (fen) {
  return fromFen(fen) != null
}
