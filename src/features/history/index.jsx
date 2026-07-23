import { useLayoutEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Table from 'react-bootstrap/Table'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Move } from '../../game_logic/move'
import { firstPlayer } from '../../selectors'
import { restoreGame } from '../../reducers/actions'

const MovesTable = styled(Table)`
  table-layout: fixed;

  td,
  th {
    padding: 0.15rem;
  }

  th {
    text-align: center;
  }
`

const Background = styled.div`
  background-color: var(--light);
  height: 100%;
  width: 100%;
`

const RestoreButton = styled.button`
  width: 100%;
  padding: 0;
  overflow: hidden;
  color: inherit;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  background: none;
  border: 0;
`

const MoveCell = ({ children, onRestore }) => {
  const ref = useRef()
  const [show, setShow] = useState(false)

  useLayoutEffect(() => {
    if (ref.current) {
      const current = ref.current

      setShow(current.offsetWidth < current.scrollWidth)
    }
  }, [children])

  const trigger = show ? ['hover', 'focus'] : []

  return (
    <OverlayTrigger trigger={trigger} overlay={<Tooltip>{children}</Tooltip>}>
      <td className='text-truncate' ref={ref}>
        {onRestore ? (
          <RestoreButton type='button' onClick={onRestore}>
            {children}
          </RestoreButton>
        ) : (
          children
        )}
      </td>
    </OverlayTrigger>
  )
}

MoveCell.propTypes = {
  children: PropTypes.node.isRequired,
  onRestore: PropTypes.func,
}

const History = () => {
  const moves = useSelector(state => state.moveHistory)
  const first = useSelector(firstPlayer)
  const dispatch = useDispatch()

  const rows = []
  let rowNumber = 1

  const restore = moveCount => {
    if (window.confirm('Restore the game to this move?')) {
      dispatch(restoreGame(moveCount))
    }
  }

  const addRow = (whiteMove, blackMove, whiteMoveCount, blackMoveCount) => {
    rows.push(
      <tr key={rowNumber}>
        <td>{rowNumber}</td>
        <MoveCell onRestore={whiteMoveCount != null ? () => restore(whiteMoveCount) : undefined}>
          {whiteMove}
        </MoveCell>
        <MoveCell onRestore={blackMoveCount != null ? () => restore(blackMoveCount) : undefined}>
          {blackMove}
        </MoveCell>
      </tr>
    )
    rowNumber += 1
  }

  const formatMove = move => (move ? Move.fromJSObj(move).toString() : '')

  if (first === 'B') {
    if (moves.length > 0) {
      addRow('...', formatMove(moves[0]), null, 1)
    }

    for (let i = 1; i < moves.length; i += 2) {
      const blackMove = moves[i + 1]
      addRow(formatMove(moves[i]), formatMove(blackMove), i + 1, blackMove ? i + 2 : null)
    }
  } else {
    for (let i = 0; i < moves.length; i += 2) {
      const blackMove = moves[i + 1]
      addRow(formatMove(moves[i]), formatMove(blackMove), i + 1, blackMove ? i + 2 : null)
    }
  }

  return (
    <Background>
      <MovesTable striped hover size='sm'>
        <thead>
          <tr>
            <th style={{ width: '16%' }}>#</th>
            <th style={{ width: '42%' }}>White</th>
            <th style={{ width: '42%' }}>Black</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </MovesTable>
    </Background>
  )
}

export default History
