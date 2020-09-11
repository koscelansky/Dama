import React from 'react'
import { useSelector } from 'react-redux'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import MoveSelector from '../containers/move-selector'
import Footer from '../containers/footer'
import Player from '../containers/player'
import WelcomeDlg from '../containers/welcome-dlg'

const Game = () => {
  const showWelcome = useSelector(state => state.state === 'new')

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
          <Col>
            <MoveSelector />
          </Col>
        </Row>
        <Row>
          <Col>
            <Footer />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Game
