import React, { Component } from 'react'

import Board from '../containers/board'
import FenForm from '../containers/fen-form'
import MovesList from '../containers/moves-list'
import Player from '../containers/player'

export default class Game extends Component {
  render () {
    return (
      <div>
        <div>
          <FenForm />
        </div>
        <div>
          <div style={{ margin: '3%' }}>
            <div style={{ float: 'left' }}>
              <Player color='white' />
            </div>
            <div style={{ float: 'right' }}>
              <Player color='black' right />
            </div>
            <div style={{ clear: 'both' }} />
          </div>
        </div>
        <div>
          <Board />
        </div>
        <div>
          <MovesList />
        </div>
      </div>
    )
  }
}
