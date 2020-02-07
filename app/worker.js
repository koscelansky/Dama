/* eslint-env worker */
import '@babel/polyfill'

import randomPlayer from './ai_player/random-player'
import alphaBetaPlayer from './ai_player/alphabeta-player'

export function * GetBestMove (data) {
  const ai = (() => {
    switch (data.player) {
      case 'ai-minmax':
        return alphaBetaPlayer(data.board, data.options)
      case 'ai-random':
      default:
        return randomPlayer(data.board, data.options)
    }
  })()

  while (true) {
    const res = ai.next()

    yield JSON.stringify(res)

    if (res.done) {
      return
    }
  }
}

self.onmessage = (e) => {
  for (const i of GetBestMove(e.data)) {
    self.postMessage(i)
  }
}
