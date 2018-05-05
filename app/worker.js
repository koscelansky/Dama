/* eslint-env serviceworker */

import randomPlayer from './ai_player/random/random-player'
import nimMaxPlayer from './ai_player/minmax/minmax-player'

self.onmessage = (e) => {
  const bestMove = (data => {
    switch (data.player) {
      case 'ai-random':
        return randomPlayer(data.board)
      case 'ai-minmax':
        return nimMaxPlayer(data.board)
    }
  })(e.data)

  self.postMessage(bestMove.toString())
}
