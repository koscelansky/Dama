export default function evaluate (board) {
  // just easy material count for starter
  const { pieces, turn } = board

  let result = 0
  for (const i of pieces) {
    if (i == null) {
      continue
    }

    if (i[0] === turn) {
      result++
    } else {
      result--
    }
  }

  return result
}
