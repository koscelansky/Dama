import React from 'react'
import styled from 'styled-components/macro'
import { useSelector } from 'react-redux'

import MoveSelector from '../containers/move-selector'
import Footer from '../containers/footer'
import Player from '../containers/player'
import WelcomeDlg from '../containers/welcome-dlg'

const Layout = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`

const PlayerWrapper = styled.div`
  padding: 2%;
  width: 100%;
  box-sizing: border-box;
`

const WhitePlayerWrapper = PlayerWrapper

const BlackPlayerWrapper = styled(PlayerWrapper)`
  justify-self: end;
`

const MoveSelectorWrapper = styled.div`
  grid-column-start: 1;
  grid-column-end: span 2;
`

const FooterWrapper = styled.div`
  grid-column-start: 1;
  grid-column-end: span 2;
`

const Game = () => {
  const showWelcome = useSelector(state => state.state === 'new')

  return (
    <>
      <WelcomeDlg show={showWelcome} />
      <Layout>
        <WhitePlayerWrapper>
          <Player color='white' />
        </WhitePlayerWrapper>
        <BlackPlayerWrapper>
          <Player color='black' right />
        </BlackPlayerWrapper>
        <MoveSelectorWrapper>
          <MoveSelector />
        </MoveSelectorWrapper>
        <FooterWrapper>
          <Footer />
        </FooterWrapper>
      </Layout>
    </>
  )
}

export default Game
