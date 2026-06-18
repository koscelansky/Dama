import 'bootstrap/dist/css/bootstrap.min.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend'
import { MultiBackend, MouseTransition, TouchTransition } from 'react-dnd-multi-backend'
import styled, { createGlobalStyle } from 'styled-components'

import Game from './components/game'
import reducer from './reducers'

const ScaledContent = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: min(calc(90vh - 80px), calc(95vw - 2rem));
  margin: 0 auto;
`

const dndPipeline = {
  backends: [
    {
      id: 'html5',
      backend: HTML5Backend,
      transition: MouseTransition,
    },
    {
      id: 'touch',
      backend: TouchBackend,
      options: { enableMouseEvents: false },
      preview: true,
      transition: TouchTransition,
    },
  ],
}

const App = () => {
  return (
    <DndProvider backend={MultiBackend} options={dndPipeline}>
      <ScaledContent>
        <Game />
      </ScaledContent>
    </DndProvider>
  )
}

export const appState = configureStore({ reducer })

const GlobalStyle = createGlobalStyle`
  html,
  body,
  #root {
    height: 100%;
  }

  body {
    background-color: cornsilk;
    min-width: 0;
    padding: 1%;
    margin: 0;
  }

  .new-game-dialog {
    width: min(560px, 95vw);
    max-width: none;
    margin: auto;
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
