/* eslint-env worker */
import '@babel/polyfill'

import randomPlayer from './ai_player/random-player'
import minMaxPlayer from './ai_player/minmax-player'

self.onmessage = (e) => {
  const ai = (data => {
    switch (data.player) {
      case 'ai-random':
        return randomPlayer(data.board)
      case 'ai-minmax':
        return minMaxPlayer(data.board)
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
