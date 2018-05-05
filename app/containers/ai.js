/* eslint-env worker */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import work from 'webworkify'

import worker from '../worker'
import Spinner from '../components/spinner'
import { movePiece } from '../actions'
import { Move } from '../game_logic/move'

class Ai extends Component {
  componentDidMount () {
    this.worker = work(worker)
    this.worker.onmessage = (e) => {
      this.props.onMoveCommited(Move.fromString(e.data))
    }
    this.worker.postMessage({
      board: this.props.board,
      player: this.props.type
    })
  }

  componentWillUnmount () {
    this.worker.terminate()
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
  board: PropTypes.shape({
    pieces: PropTypes.arrayOf(PropTypes.oneOf(['WM', 'WK', 'BM', 'BK', null])),
    turn: PropTypes.oneOf(['W', 'B']),
    piecesToHuff: PropTypes.arrayOf(PropTypes.number),
    fifteenMoveRule: PropTypes.number
  }),
  onMoveCommited: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Ai)
