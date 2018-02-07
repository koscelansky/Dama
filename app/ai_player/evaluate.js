export default function evaluate (position, player) {
  // just easy material count for starter
  let result = 0
  for (const i of position) {
    if (i == null) {
      continue
    }

    if (i[0] === player) {
      result++
    } else {
      result--
    }
  }

  return result
}
