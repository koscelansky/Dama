import React from 'react'

import Player from '../containers/player'

const PlayersHeader = (props) => {
  return (
    <div style={{ margin: '3%' }}>
      <div style={{ float: 'left' }}>
        <Player color='white' />
      </div>
      <div style={{ float: 'right' }}>
        <Player color='black' right />
      </div>
      <div style={{ clear: 'both' }} />
    </div>
  )
}

export default PlayersHeader
