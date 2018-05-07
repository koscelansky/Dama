// polyfill must be the first import in this file
import 'babel-polyfill'

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { applyMiddleware, createStore } from 'redux'
import { logger } from 'redux-logger'
import { Provider } from 'react-redux'
import TouchBackend from 'react-dnd-touch-backend'
import { DragDropContext } from 'react-dnd'
import { injectGlobal } from 'styled-components'

import Game from './components/game'
import damaApp from './reducers'
import CustomDragLayer from './drag-layer'

class App extends Component {
  render () {
    return (
      <React.Fragment>
        <Game />
        <CustomDragLayer />
      </React.Fragment>
    )
  }
}

const middlewares = []

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger)
}

export const appState = createStore(damaApp, applyMiddleware(...middlewares))

const AppRoot = DragDropContext(TouchBackend({ enableMouseEvents: true }))(App)

injectGlobal`
  body {
    background-color: cornsilk;
    font-family: Tahoma, Geneva, sans-serif;
    min-width: 420px;
  }

  textarea, input, button, select {
    font-family: inherit;
    font-size: inherit;
  }
`

ReactDOM.render(
  <Provider store={appState}>
    <AppRoot />
  </Provider>,
  document.getElementById('root')
)
