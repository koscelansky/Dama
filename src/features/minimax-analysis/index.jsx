import { useSelector } from 'react-redux'
import Table from 'react-bootstrap/Table'
import styled from 'styled-components'

const Panel = styled.section`
  width: min(100%, 34rem);
  max-height: 15rem;
  margin: 0.75rem auto 0;
  overflow: auto;
  background: #fffef8;
  border: 1px solid #9b9788;
  border-radius: 4px;
`

const Summary = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.5rem;
  padding: 0.65rem 0.75rem;
  border-bottom: 1px solid #d6d2c4;

  @media (width < 480px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`

const Metric = styled.div`
  min-width: 0;
  font-variant-numeric: tabular-nums;

  small {
    display: block;
    color: #666;
    font-size: 0.72rem;
  }

  strong {
    display: block;
    overflow: hidden;
    font-size: 0.9rem;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`

const Heading = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.6rem 0.75rem 0;

  h2 {
    margin: 0;
    font-size: 1rem;
  }

  span {
    color: #666;
    font-size: 0.75rem;
  }
`

const MovesTable = styled(Table)`
  margin: 0;
  font-size: 0.82rem;
  font-variant-numeric: tabular-nums;

  th,
  td {
    padding: 0.25rem 0.75rem;
  }
`

const Empty = styled.p`
  margin: 0;
  padding: 0.75rem;
  color: #666;
`

const formatNumber = value => Number(value).toLocaleString()

const MinimaxAnalysis = () => {
  const { enabled, latest } = useSelector(state => state.minimaxAnalysis)

  if (!enabled) return null

  if (latest == null) {
    return (
      <Panel aria-live='polite'>
        <Empty>Waiting for the MinMax search...</Empty>
      </Panel>
    )
  }

  const side = latest.side === 'W' ? 'White' : 'Black'

  return (
    <Panel aria-live='polite'>
      <Heading>
        <h2>MinMax search</h2>
        <span>{side} to move; positive favors White</span>
      </Heading>
      <Summary>
        <Metric>
          <small>Depth</small>
          <strong>{latest.depth}</strong>
        </Metric>
        <Metric title={latest.bestMove}>
          <small>Best move</small>
          <strong>{latest.bestMove}</strong>
        </Metric>
        <Metric>
          <small>Score</small>
          <strong>{formatNumber(latest.bestValue)}</strong>
        </Metric>
        <Metric>
          <small>Evaluator</small>
          <strong>{latest.evaluation.replaceAll('-', ' ')}</strong>
        </Metric>
        <Metric>
          <small>Nodes</small>
          <strong>{formatNumber(latest.nodes)}</strong>
        </Metric>
        <Metric>
          <small>Cutoffs</small>
          <strong>{formatNumber(latest.cutoffs)}</strong>
        </Metric>
        <Metric>
          <small>Iteration time</small>
          <strong>{formatNumber(latest.elapsedMs)} ms</strong>
        </Metric>
        <Metric>
          <small>Candidate moves</small>
          <strong>{latest.candidates.length}</strong>
        </Metric>
      </Summary>
      <MovesTable striped hover size='sm'>
        <thead>
          <tr>
            <th>Root move</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {latest.candidates.map(candidate => (
            <tr key={candidate.move}>
              <td>{candidate.move}</td>
              <td>{formatNumber(candidate.value)}</td>
            </tr>
          ))}
        </tbody>
      </MovesTable>
    </Panel>
  )
}

export default MinimaxAnalysis