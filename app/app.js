
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'

import Game from './components/game'
import damaApp from './reducers'
import CustomDragLayer from './drag-layer'

class App extends Component {
  render () {
    return (
      <div>
        <Game />
        <CustomDragLayer />
      </div>
    )
  }
}

export const appState = createStore(damaApp)

const AppRoot = DragDropContext(HTML5Backend)(App)

ReactDOM.render(
  <Provider store={appState}>
    <AppRoot />
  </Provider>,
  document.getElementById('root')
)
