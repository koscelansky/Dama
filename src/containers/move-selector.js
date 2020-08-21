
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Board from '../containers/board'

import { movePiece, guiHuffPiece } from '../actions'
import { possibleMovesSelector, gameResultSelector } from '../selectors'
import { GameResult } from '../game_logic/const'

class MoveSelector extends Component {
  constructor (props) {
    super(props)
    this.handlePieceMove = this.handlePieceMove.bind(this)
    this.handlePieceHuff = this.handlePieceHuff.bind(this)
  }

  handlePieceMove (move) {
    // add huff to move
    const huffed = this.state
    if (huffed != null && huffed >= 0) {
      move.huff = huffed
    }

    this.props.onMoveCommited(move)
  }

  handlePieceHuff (square) {
    this.props.onPieceHuff(square)
  }

  getPiecesToHuff () {
    const { huffed, moves } = this.props
    if (huffed != null) {
      return null
    }

    const pieces = [...new Set(moves.filter(x => x.huff != null).map(x => x.huff))]

    return pieces.length > 0 ? pieces : null
  }

  getSimpleMoves () {
    let { huffed, moves } = this.props
    if (huffed === -1) {
      // if user select no pieces to huff, it is the same as no piece to huff
      huffed = null
    }

    return moves.filter(x => x.huff === huffed)
  }

  render () {
    const { readonly, huffed } = this.props

    const pieces = [...this.props.pieces]
    if (huffed != null && huffed >= 0) {
      pieces[huffed] = null
    }

    const piecesToHuff = this.getPiecesToHuff()
    const simpleMoves = readonly ? null : this.getSimpleMoves()

    const select = (() => {
      if (readonly) {
        return 'show'
      } else if (piecesToHuff != null) {
        return 'huff'
      } else {
        return 'move'
      }
    })()

    return (
      <Board
        onPieceMove={this.handlePieceMove}
        onPieceHuff={this.handlePieceHuff}
        huff={piecesToHuff}
        moves={simpleMoves}
        select={select}
        pieces={pieces}
      />
    )
  }
}

MoveSelector.propTypes = {
  onMoveCommited: PropTypes.func.isRequired,
  onPieceHuff: PropTypes.func.isRequired,
  moves: PropTypes.arrayOf(PropTypes.object),
  pieces: PropTypes.arrayOf(PropTypes.string),
  readonly: PropTypes.bool,
  huffed: PropTypes.number // number of huffed square
}

function mapDispatchToProps (dispatch) {
  return {
    onMoveCommited: (move) => {
      return dispatch(movePiece(move))
    },

    onPieceHuff: (square) => {
      return dispatch(guiHuffPiece(square))
    }
  }
}

function mapStateToProps (state, ownProps) {
  const nextPlayer = state.board.turn === 'W' ? 'white' : 'black'
  const result = gameResultSelector(state)

  return {
    pieces: state.board.pieces,
    moves: possibleMovesSelector(state),
    huffed: state.gui.huffed,
    readonly: state.gameSettings[nextPlayer].type !== 'human' || result !== GameResult.InProgress
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MoveSelector)
