// polyfill must be the first import in this file
import '@babel/polyfill'

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { applyMiddleware, createStore } from 'redux'
import { logger } from 'redux-logger'
import { Provider } from 'react-redux'
import TouchBackend from 'react-dnd-touch-backend'
import { DragDropContext } from 'react-dnd'
import styled, { createGlobalStyle } from 'styled-components'

import Game from './components/game'
import damaApp from './reducers'
import CustomDragLayer from './drag-layer'

const ScaledContent = styled.div`
  position: relative;
  width: calc(80vh - 80px);
  min-width: 460px;
  max-width: 95vw;
  margin: 0 auto;
`

class App extends Component {
  render () {
    return (
      <ScaledContent>
        <Game />
        <CustomDragLayer />
      </ScaledContent>
    )
  }
}

const middlewares = []

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger)
}

export const appState = createStore(damaApp, applyMiddleware(...middlewares))

const AppRoot = DragDropContext(TouchBackend({ enableMouseEvents: true }))(App)

const GlobalStyle = createGlobalStyle`
  html {
    position: relative;
    min-height: 100%;
  }

  body {
    background-color: cornsilk;
    font-family: Tahoma, Geneva, sans-serif;
    min-width: 420px;
    padding: 1%;
    margin: 0px;
  }

  textarea, input, button, select {
    font-family: inherit;
    font-size: inherit;
  }
`

ReactDOM.render(
  <React.Fragment>
    <Provider store={appState}>
      <AppRoot />
    </Provider>
    <GlobalStyle />
  </React.Fragment>,
  document.getElementById('root')
)
