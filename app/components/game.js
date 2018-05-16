import React, { Component } from 'react'
import styled from 'styled-components'

import MoveSelector from '../containers/move-selector'
import Footer from '../containers/footer'
import Player from '../containers/player'
import WelcomeDlg from '../containers/welcome-dlg'

const Layout = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`

const PlayerWrapper = styled.div`
  margin: 5%;
  font-size: 6vw;
`

const WhitePlayerWrapper = PlayerWrapper

const BlackPlayerWrapper = PlayerWrapper.extend`
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

export default class Game extends Component {
  render () {
    return (
      <React.Fragment>
        <WelcomeDlg />
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
      </React.Fragment>
    )
  }
}
