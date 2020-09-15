import 'bootstrap/dist/css/bootstrap.min.css'

import React from 'react'
import ReactDOM from 'react-dom'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { logger } from 'redux-logger'
import { Provider } from 'react-redux'
import { TouchBackend } from 'react-dnd-touch-backend'
import { DndProvider } from 'react-dnd'
import styled, { createGlobalStyle } from 'styled-components/macro'

import Game from './components/game'
import reducer from './reducers'

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
      </ScaledContent>
    </DndProvider>
  )
}

const middleware = [...getDefaultMiddleware()]

if (process.env.NODE_ENV === 'development') {
  middleware.push(logger)
}

export const appState = configureStore({
  reducer,
  middleware,
  devTools: process.env.NODE_ENV !== 'production'
})

const GlobalStyle = createGlobalStyle`
  html {
    position: relative;
    min-height: 100%;
  }

  body {
    background-color: cornsilk;
    min-width: 420px;
    padding: 1%;
    margin: 0px;
  }

  .welcome-dlg {
    max-width: 50% !important;
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
