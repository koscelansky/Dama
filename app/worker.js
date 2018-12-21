/* eslint-env worker */
import '@babel/polyfill'

import randomPlayer from './ai_player/random-player'
import alphaBetaPlayer from './ai_player/alphabeta-player'
import minmaxPlayer from './ai_player/minman-player'

self.onmessage = (e) => {
  const ai = (data => {
    switch (data.player) {
      case 'ai-random':
        return randomPlayer(data.board, data.options)
      case 'ai-minmax':
        if (data.options.alphaBeta) {
          return alphaBetaPlayer(data.board, data.options)
        } else {
          return minmaxPlayer(data.board, data.options)
        }
    }
  })(e.data)

  while (true) {
    const res = ai.next()

    self.postMessage(JSON.stringify(res))
    if (res.done) {
      return
    }
  }
}
