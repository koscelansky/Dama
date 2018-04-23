/* eslint-env serviceworker */

import randomPlayer from './ai_player/random-player'

self.onmessage = (e) => {
  const bestMove = randomPlayer(e.data.board)

  self.postMessage(bestMove.toString())
}
