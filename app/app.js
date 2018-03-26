// polyfill must be the first import in this file
import 'babel-polyfill'

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { applyMiddleware, createStore } from 'redux'
import { logger } from 'redux-logger'
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

const middlewares = []

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger)
}

export const appState = createStore(damaApp, applyMiddleware(...middlewares))

const AppRoot = DragDropContext(HTML5Backend)(App)

ReactDOM.render(
  <Provider store={appState}>
    <AppRoot />
  </Provider>,
  document.getElementById('root')
)
