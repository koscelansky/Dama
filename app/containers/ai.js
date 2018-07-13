/* eslint-env worker */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Spinner from '../components/spinner'
import { movePiece } from '../actions'
import { Move } from '../game_logic/move'

class Ai extends Component {
  componentDidMount () {
    // hard wired path is not ideal, however I cannot see a simple way
    // to get current script path from within the browser
    this.worker = new Worker('./js/generated/worker.js')
    this.worker.onmessage = (e) => {
      const data = JSON.parse(e.data)

      if (data.done) {
        this.props.onMoveCommited(Move.fromJSON(data.value))
      }

      this.bestMove = data.value
    }

    const { time } = this.props.options

    this.timer = time != null ? setTimeout(() => {
      this.props.onMoveCommited(Move.fromJSON(this.bestMove))
    }, time * 1000) : null

    this.worker.postMessage({
      board: this.props.board,
      options: this.props.options,
      player: this.props.type
    })
  }

  componentWillUnmount () {
    this.worker.terminate()
    this.timer != null && clearTimeout(this.timer)
  }

  render () {
    return (
      <Spinner />
    )
  }
}

function mapStateToProps (state, ownProps) {
  return {
    board: state.board
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onMoveCommited: (move) => {
      return dispatch(movePiece(move))
    }
  }
}

Ai.propTypes = {
  type: PropTypes.oneOf(['ai-random', 'ai-minmax']),
  options: PropTypes.any,
  board: PropTypes.shape({
    pieces: PropTypes.arrayOf(PropTypes.oneOf(['WM', 'WK', 'BM', 'BK', null])),
    turn: PropTypes.oneOf(['W', 'B']),
    piecesToHuff: PropTypes.arrayOf(PropTypes.number),
    fifteenMoveRule: PropTypes.number
  }),
  onMoveCommited: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Ai)
