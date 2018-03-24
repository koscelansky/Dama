// FEN format is described here https://en.wikipedia.org/wiki/Portable_Draughts_Notation
// [FEN "[Turn]:[Color 1][K][Square number][,]...]:[Color 2][K][Square number][,]...]"]
// as in Slovak checkers there is the huffing rule, we need to encode which
// squares can be huffed, this is done by adding [:X[Square number][,]...]

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

  let result = state.turn + ':' + whitePieces + ':' + blackPieces
  if (state.piecesToHuff.length > 0) {
    result += ':X' + state.piecesToHuff.map(x => x + 1).join(',')
  }

  return result
}

export function fromFen (fen) {
  const parts = fen.split(':')

  if (parts.length !== 3 && parts.length !== 4) return null

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

  let piecesToHuff = []
  if (parts[3] != null) {
    const p = parts[3]

    if (p === '') {
      return null
    }

    const positions = p.substring(1).split(',')
    for (let j of positions) {
      if (j === '') {
        return null
      }

      const pos = (+j) - 1
      if (isNaN(pos) || pos < 0 || pos >= 32) {
        return null
      }

      piecesToHuff.push(pos)
    }

    for (const i of piecesToHuff) {
      if (pieces[i] == null || pieces[i][0] === turn) {
        return null
      }
    }
  }

  return {turn, pieces, fifteenMoveRule: 0, piecesToHuff}
}

export function isValidFen (fen) {
  return fromFen(fen) != null
}
