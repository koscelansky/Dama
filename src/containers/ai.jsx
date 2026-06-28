import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components'

import { movePiece } from '../reducers/actions'
import { Move } from '../game_logic/move'

const bounce = keyframes`
  0%, 80%, 100% { transform: scale(0); opacity: 0.3; }
  40%           { transform: scale(1);   opacity: 1; }
`

const DotsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`

const Dot = styled.span`
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: currentColor;
  animation: ${bounce} 1.2s ease-in-out infinite both;
  animation-delay: ${({ $i }) => $i * 0.2}s;
`

const Ai = ({ type, options }) => {
  const board = useSelector(state => state.board)
  const dispatch = useDispatch()
  const bestMoveRef = useRef(null)

  useEffect(() => {
    const worker = new Worker(new URL('../ai.worker.js', import.meta.url), { type: 'module' })

    worker.onmessage = e => {
      const data = JSON.parse(e.data)
      if (data.done) {
        dispatch(movePiece(Move.fromJSON(data.value).toJSObj()))
      }
      bestMoveRef.current = data.value
    }

    const { time } = options
    const timer =
      time != null
        ? setTimeout(() => {
            dispatch(movePiece(Move.fromJSON(bestMoveRef.current).toJSObj()))
          }, time * 1000)
        : null

    worker.postMessage({ board, options, player: type })

    return () => {
      worker.terminate()
      if (timer != null) clearTimeout(timer)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps -- intentionally run once on mount

  return (
    <DotsWrapper aria-label='Thinking' role='status'>
      <Dot $i={0} />
      <Dot $i={1} />
      <Dot $i={2} />
    </DotsWrapper>
  )
}

Ai.propTypes = {
  type: PropTypes.oneOf(['ai-random', 'ai-minmax']),
  options: PropTypes.any,
}

export default Ai
