import React from 'react'
import { useSelector } from 'react-redux'
import Table from 'react-bootstrap/Table'
import styled from 'styled-components/macro'

import { firstPlayer } from '../../selectors'

const MovesTable = styled(Table)`
  background-color: var(--white);
  table-layout: fixed;
  td, th {
    padding: 0.15rem;
  }
  th {
    text-align: center;
  }
`

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
        <td>{moves[i * 2].toString()}</td>
        <td>{(moves[i * 2 + 1] || '').toString()}</td>
      </tr>
    )
  }

  return (
    <MovesTable striped bordered hover size='sm'>
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
  )
}

export default History
