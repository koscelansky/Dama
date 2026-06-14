import React from 'react'
import { useSelector } from 'react-redux'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import MoveSelector from '../containers/move-selector'
import Footer from '../containers/footer'
import Player from '../containers/player'
import WelcomeDlg from '../containers/welcome-dlg'
import History from '../features/history'
import { GlobalState } from '../reducers/consts'

const Game = () => {
  const showWelcome = useSelector(state => state.globalState === GlobalState.New)

  return (
    <>
      <WelcomeDlg show={showWelcome} />
      <Container>
        <Row>
          <Col>
            <Player color='white' />
          </Col>
          <Col>
            <Player color='black' right />
          </Col>
        </Row>
        <Row>
          <Col className='px-0'>
            <MoveSelector />
          </Col>
          <Col sm='3' className='pr-0 pl-1'>
            <History />
          </Col>
        </Row>
        <Row>
          <Col className='px-0'>
            <Footer />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Game
