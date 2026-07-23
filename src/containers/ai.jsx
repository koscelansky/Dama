import { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components'

import { movePiece } from '../reducers/actions'
import { Move } from '../game_logic/move'

const bounce = keyframes`
  0%, 80%, 100% { transform: scale(0); opacity: 0.3; }
  40%           { transform: scale(1);   opacity: 1; }
`

const ThinkingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
`

const Dots = styled.div`
  display: flex;
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

const Countdown = styled.span`
  min-width: 4ch;
  font-size: 0.8em;
  font-variant-numeric: tabular-nums;
  line-height: 1;
  text-align: center;
`

const formatTime = seconds => `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`

const Ai = ({ type, options }) => {
  const board = useSelector(state => state.board)
  const dispatch = useDispatch()
  const bestMoveRef = useRef(null)
  const [remainingTime, setRemainingTime] = useState(options.time ?? null)

  if (options.time !== undefined && (!Number.isFinite(options.time) || options.time <= 0)) {
    throw new Error('AI time must be a positive number when provided.')
  }

  const formattedRemainingTime = remainingTime == null ? null : formatTime(remainingTime)

  useEffect(() => {
    const worker = new Worker(new URL('../ai.worker.js', import.meta.url), { type: 'module' })
    let hasMoved = false
    const deadline = options.time !== undefined ? Date.now() + options.time * 1000 : null

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
      deadline !== null
        ? setTimeout(() => {
            playBestMove()
          }, options.time * 1000)
        : null

    const countdown =
      deadline !== null
        ? setInterval(() => {
            setRemainingTime(Math.max(0, Math.ceil((deadline - Date.now()) / 1000)))
          }, 250)
        : null

    worker.postMessage({ board, options, player: type })

    return () => {
      worker.terminate()
      if (timer != null) clearTimeout(timer)
      if (countdown != null) clearInterval(countdown)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps -- intentionally run once on mount

  return (
    <ThinkingWrapper
      aria-label={
        formattedRemainingTime == null
          ? 'Thinking'
          : `Thinking, ${formattedRemainingTime} remaining`
      }
      role='status'
    >
      <Dots aria-hidden='true'>
        <Dot $i={0} />
        <Dot $i={1} />
        <Dot $i={2} />
      </Dots>
      {formattedRemainingTime != null && (
        <Countdown aria-hidden='true'>{formattedRemainingTime}</Countdown>
      )}
    </ThinkingWrapper>
  )
}

Ai.propTypes = {
  type: PropTypes.oneOf(['ai-random', 'ai-minmax']),
  options: PropTypes.shape({
    time: PropTypes.number,
  }).isRequired,
}

export default Ai
