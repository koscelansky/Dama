import 'bootstrap/dist/css/bootstrap.min.css'

import React from 'react'
import ReactDOM from 'react-dom'
import { applyMiddleware, createStore } from 'redux'
import { logger } from 'redux-logger'
import { Provider } from 'react-redux'
import { TouchBackend } from 'react-dnd-touch-backend'
import { DndProvider } from 'react-dnd'
import styled, { createGlobalStyle } from 'styled-components/macro'

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

const App = () => {
  return (
    <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
      <ScaledContent>
        <Game />
        <CustomDragLayer />
      </ScaledContent>
    </DndProvider>
  )
}

const middlewares = []

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger)
}

export const appState = createStore(damaApp, applyMiddleware(...middlewares))

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
`

ReactDOM.render(
  <React.StrictMode>
    <Provider store={appState}>
      <App />
    </Provider>
    <GlobalStyle />
  </React.StrictMode>,
  document.getElementById('root')
)
