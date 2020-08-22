
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Board from '../containers/board'

import { movePiece } from '../actions'
import { possibleMovesSelector, gameResultSelector } from '../selectors'
import { GameResult } from '../game_logic/const'

const MoveSelector = ({ onMoveCommited, moves, pieces, readonly }) => {
  const handlePieceMove = (move) => {
    onMoveCommited(move)
  }

  return (
    <Board
      onPieceMove={handlePieceMove}
      moves={moves}
      active={!readonly}
      pieces={pieces}
    />
  )
}

MoveSelector.propTypes = {
  onMoveCommited: PropTypes.func.isRequired,
  moves: PropTypes.arrayOf(PropTypes.object),
  pieces: PropTypes.arrayOf(PropTypes.string),
  readonly: PropTypes.bool
}

function mapDispatchToProps (dispatch) {
  return {
    onMoveCommited: (move) => {
      return dispatch(movePiece(move))
    }
  }
}

function mapStateToProps (state, ownProps) {
  const nextPlayer = state.board.turn === 'W' ? 'white' : 'black'
  const result = gameResultSelector(state)

  return {
    pieces: state.board.pieces,
    moves: possibleMovesSelector(state),
    readonly: state.gameSettings[nextPlayer].type !== 'human' || result !== GameResult.InProgress
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MoveSelector)
