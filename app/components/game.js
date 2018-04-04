import React, { Component } from 'react'

import MoveSelector from '../containers/move-selector'
import FenForm from '../containers/fen-form'
import MovesList from '../containers/moves-list'
import PlayersHeader from './players-header'

export default class Game extends Component {
  render () {
    return (
      <div>
        <div>
          <FenForm />
        </div>
        <div>
          <PlayersHeader />
        </div>
        <div>
          <MoveSelector />
        </div>
        <div>
          <MovesList />
        </div>
      </div>
    )
  }
}
