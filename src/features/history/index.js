import React, { useLayoutEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import Table from 'react-bootstrap/Table'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import styled from 'styled-components/macro'

import { firstPlayer } from '../../selectors'

const MovesTable = styled(Table)`
  table-layout: fixed;
  td, th {
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
      <td className='text-truncate' ref={ref}>{children}</td>
    </OverlayTrigger>
  )
}

const History = () => {
  const moves = [...useSelector(state => state.moveHistory)]

  if (useSelector(firstPlayer) === 'B') {
    moves.unshift('...') // placeholder for white, if first is black
  }

  const rows = []

  for (let i = 0; i < moves.length / 2; i += 1) {
    rows.push(
      <tr key={i}>
        <td>{i + 1}</td>
        <MoveCell>{moves[i * 2].toString()}</MoveCell>
        <MoveCell>{(moves[i * 2 + 1] || '').toString()}</MoveCell>
      </tr>
    )
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
        <tbody>
          {rows}
        </tbody>
      </MovesTable>
    </Background>
  )
}

export default History
