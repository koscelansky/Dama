import { useSelector } from 'react-redux'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import styled from 'styled-components'

import MoveSelector from '../containers/move-selector'
import Footer from '../containers/footer'
import Player from '../containers/player'
import WelcomeDlg from '../containers/welcome-dlg'
import History from '../features/history'
import LeftPanel from '../features/left-panel'
import { GlobalState } from '../reducers/consts'

const FooterWrapper = styled.footer`
  margin-top: auto;
  padding-top: 0.5rem;
`

const BoardArea = styled.div`
  position: relative;
`

const LeftPanelWrapper = styled.div`
  margin-top: 0.5rem;

  @media (min-width: 768px) {
    position: absolute;
    right: calc(100% + 0.75rem);
    top: 0;
    width: 120px;
    margin-top: 0;
  }
`

const HistoryPanel = styled.div`
  margin-top: 0.5rem;

  @media (min-width: 768px) {
    position: absolute;
    left: calc(100% + 0.75rem);
    top: 0;
    width: 180px;
    margin-top: 0;
  }
`

const Game = () => {
  const showWelcome = useSelector(state => state.globalState === GlobalState.New)

  return (
    <>
      <WelcomeDlg show={showWelcome} />
      <Container className='d-flex flex-column flex-grow-1 px-0'>
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
            <BoardArea>
              <LeftPanelWrapper>
                <LeftPanel />
              </LeftPanelWrapper>
              <MoveSelector />
              <HistoryPanel>
                <History />
              </HistoryPanel>
            </BoardArea>
          </Col>
        </Row>
        <FooterWrapper>
          <hr className='mt-0' />
          <Footer />
        </FooterWrapper>
      </Container>
    </>
  )
}

export default Game
