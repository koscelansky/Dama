import React, { Component } from 'react'

import MoveSelector from '../containers/move-selector'
import MovesList from '../containers/moves-list'
import PlayersHeader from './players-header'

import NewGameDlg from '../containers/new-game-dlg'

export default class Game extends Component {
  render () {
    return (
      <div>
        <NewGameDlg />
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
