import React, { Component } from 'react'
import styled from 'styled-components'

import MoveSelector from '../containers/move-selector'
import MovesList from '../containers/moves-list'
import Player from '../containers/player'

const Layout = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`

const PlayerWrapper = styled.div`
  margin: 3%;
  font-size: 6.5vw;
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
          <MovesList />
        </FooterWrapper>
      </Layout>
    )
  }
}
