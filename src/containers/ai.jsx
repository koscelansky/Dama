import React, { Component } from 'react'
import { connect } from 'react-redux'
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

class Ai extends Component {
  componentDidMount() {
    this.worker = new Worker(new URL('../ai.worker.js', import.meta.url), { type: 'module' })
    this.worker.onmessage = (e) => {
      const data = JSON.parse(e.data)

      if (data.done) {
        this.props.onMoveCommited(Move.fromJSON(data.value))
      }

      this.bestMove = data.value
    }

    const { time } = this.props.options

    this.timer =
      time != null
        ? setTimeout(() => {
            this.props.onMoveCommited(Move.fromJSON(this.bestMove))
          }, time * 1000)
        : null

    this.worker.postMessage({
      board: this.props.board,
      options: this.props.options,
      player: this.props.type,
    })
  }

  componentWillUnmount() {
    this.worker.terminate()
    this.timer != null && clearTimeout(this.timer)
  }

  render() {
    return (
      <DotsWrapper aria-label='Thinking' role='status'>
        <Dot $i={0} />
        <Dot $i={1} />
        <Dot $i={2} />
      </DotsWrapper>
    )
  }
}

function mapStateToProps(state) {
  return {
    board: state.board,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onMoveCommited: (move) => {
      return dispatch(movePiece(move))
    },
  }
}

Ai.propTypes = {
  type: PropTypes.oneOf(['ai-random', 'ai-minmax']),
  options: PropTypes.any,
  board: PropTypes.shape({
    pieces: PropTypes.arrayOf(PropTypes.oneOf(['WM', 'WK', 'BM', 'BK', null])),
    turn: PropTypes.oneOf(['W', 'B']),
    piecesToHuff: PropTypes.arrayOf(PropTypes.number),
    fifteenMoveRule: PropTypes.number,
  }),
  onMoveCommited: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Ai)
