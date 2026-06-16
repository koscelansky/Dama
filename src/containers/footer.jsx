import { useSelector } from 'react-redux'
import styled from 'styled-components'

import FenDlg from '../features/fen-dlg'

import { gameResultSelector, possibleMovesSelector } from '../selectors'

const DivWrapper = styled.div`
  padding-left: 1em;
  text-indent: -1em;
`

function getPlayerStatusString(player) {
  const { type, name: _, ...options } = player

  const result = (() => {
    if (type === 'human') {
      return JSON.stringify({ type }, null, 1)
    } else if (type === 'ai-random') {
      return JSON.stringify({ type }, null, 1)
    } else if (type === 'ai-minmax') {
      return JSON.stringify({ type, ...options }, null, 1)
    }
  })()

  return result.replace(/-/g, String.fromCharCode(8209))
}

const Footer = () => {
  const result = useSelector(gameResultSelector)
  const moves = useSelector(possibleMovesSelector)
  const white = useSelector(state => getPlayerStatusString(state.gameSettings.white))
  const black = useSelector(state => getPlayerStatusString(state.gameSettings.black))
  const str = moves.join(' ')

  return (
    <div>
      <DivWrapper>Result: {result}</DivWrapper>
      <DivWrapper>
        <FenDlg />
      </DivWrapper>
      <DivWrapper>Possible moves: {str}</DivWrapper>
      <DivWrapper>White: {white}</DivWrapper>
      <DivWrapper>Black: {black}</DivWrapper>
    </div>
  )
}

export default Footer
