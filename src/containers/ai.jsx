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
  background-color: currentcolor;
  animation: ${bounce} 1.2s ease-in-out infinite both;
  animation-delay: ${({ $i }) => $i * 0.2}s;
`

const Ai = ({ type, options }) => {
  const board = useSelector(state => state.board)
  const dispatch = useDispatch()
  const bestMoveRef = useRef(null)

  if (options.time !== undefined && (!Number.isFinite(options.time) || options.time <= 0)) {
    throw new Error('AI time must be a positive number when provided.')
  }

  useEffect(() => {
    const worker = new Worker(new URL('../ai.worker.js', import.meta.url), { type: 'module' })
    let hasMoved = false

    const playBestMove = () => {
      if (hasMoved || bestMoveRef.current == null) return

      hasMoved = true
      dispatch(movePiece(Move.fromJSON(bestMoveRef.current).toJSObj()))
    }

    worker.onmessage = e => {
      const data = JSON.parse(e.data)
      if (data.value !== null) bestMoveRef.current = data.value

      if (data.play) {
        playBestMove()
      }
    }

    const timer =
      options.time !== undefined
        ? setTimeout(() => {
            playBestMove()
          }, options.time * 1000)
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
  options: PropTypes.shape({
    time: PropTypes.number,
  }).isRequired,
}

export default Ai
