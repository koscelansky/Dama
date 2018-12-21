// to all function will evaluate position from point of white player that means
// if white is "winning" positive value is returned, if black is "winning"
// negative value is returned, it is roughly equivalent to white - black

// just easy material count, no special handling of kings, so the evaluation may
// be high even if the playing side actually have two pawns against two kings
export function materialCount (board) {
  // we are still playing
  const { pieces } = board

  let result = 0
  for (const i of pieces) {
    if (i == null) {
      continue
    }

    if (i[0] === 'W') {
      result++
    } else {
      result--
    }
  }

  return result
}

// more advanced material count, the king is actually 5 times more valuable then
// pawn, so take this into count
export function weightedMaterialCount (board) {
  // we are still playing
  const { pieces } = board

  let result = 0
  for (const i of pieces) {
    if (i == null) {
      continue
    }

    if (i[0] === 'W') {
      result += i[1] === 'M' ? 1 : 5
    } else {
      result -= i[1] === 'M' ? 1 : 5
    }
  }

  return result
}
