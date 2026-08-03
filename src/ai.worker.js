import randomPlayer from './ai_player/random-player'
import alphaBetaPlayer from './ai_player/alphabeta-player'

function* GetBestMove(data) {
  const ai = (() => {
    switch (data.player) {
      case 'ai-minmax':
        return alphaBetaPlayer(data.board, data.options)
      case 'ai-random':
      default:
        return randomPlayer(data.board, data.options)
    }
  })()

  // Stream each progressively better result; the final message commits the best move found.
  let best = { move: null, analysis: null }
  // for...of consumes only yielded values; a generator `return` value would be ignored,
  // so each player must yield every result, including its final one.
  for (const result of ai) {
    best = result
    yield { ...best, play: false }
  }

  yield { ...best, play: true }
}

// somehow this will fail in production, so this will work around it

self.onmessage = e => {
  for (const i of GetBestMove(e.data)) {
    self.postMessage(i)
  }
}
