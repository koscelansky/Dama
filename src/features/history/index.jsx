import { useLayoutEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import Table from 'react-bootstrap/Table'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Move } from '../../game_logic/move'
import { firstPlayer } from '../../selectors'

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

const MoveCell = ({ children }) => {
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
        {children}
      </td>
    </OverlayTrigger>
  )
}

MoveCell.propTypes = {
  children: PropTypes.node.isRequired,
}

const History = () => {
  const moves = useSelector(state => state.moveHistory)
  const first = useSelector(firstPlayer)

  const rows = []
  let rowNumber = 1

  const addRow = (whiteMove, blackMove) => {
    rows.push(
      <tr key={rowNumber}>
        <td>{rowNumber}</td>
        <MoveCell>{whiteMove}</MoveCell>
        <MoveCell>{blackMove}</MoveCell>
      </tr>
    )
    rowNumber += 1
  }

  const formatMove = move => (move ? Move.fromJSObj(move).toString() : '')

  if (first === 'B') {
    if (moves.length > 0) {
      addRow('...', formatMove(moves[0]))
    }

    for (let i = 1; i < moves.length; i += 2) {
      addRow(formatMove(moves[i]), formatMove(moves[i + 1]))
    }
  } else {
    for (let i = 0; i < moves.length; i += 2) {
      addRow(formatMove(moves[i]), formatMove(moves[i + 1]))
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
