import { getGameResult } from '../../game_logic/perform-move'
import { GameResult } from '../../game_logic/const'

// to all function will evaluate position from point of white player that means
// if white is "winning" positive value is returned, if black is "winning"
// negative value is returned, it is roughly equivalent to white - black

// just easy material count, no special handling of kings, so the evaluation may
// be high even if the playing side actually have two pawns against two kings
function materialCount (board) {
  const gameResult = getGameResult(board)
  switch (gameResult) {
    case GameResult.WhiteWins: return 100000
    case GameResult.BlackWins: return -100000
    case GameResult.Draw: return 0
  }

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

export default function evaluate (board, type) {
  switch (type) {
    default:
    case 'material-count': return materialCount(board)
  }
}
