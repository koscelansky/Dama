import 'bootstrap/dist/css/bootstrap.min.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { TouchBackend } from 'react-dnd-touch-backend'
import { DndProvider } from 'react-dnd'
import styled, { createGlobalStyle } from 'styled-components'

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

export const appState = configureStore({ reducer })

const GlobalStyle = createGlobalStyle`
  html {
    position: relative;
    min-height: 100%;
  }

  body {
    background-color: cornsilk;
    min-width: 420px;
    padding: 1%;
    margin: 0;
  }

  .welcome-dlg {
    max-width: 50% !important;
  }
`

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <StrictMode>
    <Provider store={appState}>
      <App />
    </Provider>
    <GlobalStyle />
  </StrictMode>
)
