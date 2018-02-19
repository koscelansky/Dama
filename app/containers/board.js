
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import _ from 'lodash'

import DragPiece from '../containers/drag-piece'
import DropSquare from '../containers/drop-square'

import { movePiece } from '../actions'
import { possibleMovesSelector } from '../selectors'

class Board extends Component {
  constructor (props) {
    super(props)
    this.hoverDropSquare = this.hoverDropSquare.bind(this)
    this.pieceDrop = this.pieceDrop.bind(this)
    this.canDragDrop = this.canDragDrop.bind(this)
    this.isMovePossible = this.isMovePossible.bind(this)
    this.state = {
      markedSquaresForCapture: [],
      hintSquares: []
    }
  }

  resetState () {
    const newState = {
      markedSquaresForCapture: [],
      hintSquares: []
    }

    if (!_.isEqual(this.state, newState)) {
      this.setState(newState)
    }
  }

  selectMoves (from, to) {
    const { moves } = this.props
    const hint = this.state.hintSquares

    let possibleMoves = moves.filter(x => x.begin() === from && x.end() === to)
    if (possibleMoves.length === 0) {
      return null
    }

    if (possibleMoves.length === 1) {
      return possibleMoves[0] // only one move is possible to selected square
    }

    // there are more then one way to go to to squares :)
    // use hint to compute which move is the best match
    let rankedMoves = possibleMoves.map(move => {
      let rank = 0
      let j = 0 // index in hint
      for (const i of move.squares) {
        if (i === hint[j]) {
          rank++
          j++
        }
      }
      return { move, rank }
    })

    rankedMoves.sort((a, b) => b.rank - a.rank) // sort in reverse order
    if (rankedMoves[0].rank > rankedMoves[1].rank) {
      return rankedMoves[0].move
    } else {
      // so rank is equal we need to prioritize simple moves and then shorter moves
      const simple = rankedMoves.find(x => !x.move.isCapture())
      if (simple) {
        return simple.move
      }

      const shortest = _
        .takeWhile(rankedMoves, x => x.rank === rankedMoves[0].rank)
        .map(x => x.move)
        .sort((a, b) => a.squares.length - b.squares.length)

      if (shortest[0].squares.length < shortest[1].squares.length) {
        return shortest[0]
      }
    }

    return null // still ambiguous
  }

  pieceDrop (from, to) {
    try {
      if (from == null || to == null) {
        return // empty drop
      }

      const move = this.selectMoves(from, to)
      if (!move) {
        throw new Error('Ambiguous move selected.')
      }

      return this.props.onPieceMove(move)
    } finally {
      this.resetState()
    }
  }

  hoverDropSquare (from, to) {
    if (from === to) {
      this.resetState()
    }

    const move = this.selectMoves(from, to)

    const capturedSquares = move ? _.sortBy([...move.getCapturedSquares()]) : []

    if (!_.isEqual(capturedSquares, this.state.markedSquaresForCapture)) {
      this.setState({ markedSquaresForCapture: capturedSquares })
    }

    // undefined means do not touch hints (hover over white space...)
    if (!move) return

    const hint = move.end()
    let hintSquares = [...this.state.hintSquares]

    while (hintSquares.length > 0 &&
      !move.squares.includes(_.last(hintSquares))) {
      hintSquares.pop()
    }

    if (_.last(hintSquares) !== hint) {
      hintSquares.push(hint)
    }

    if (!_.isEqual(hintSquares, this.state.hintSquares)) {
      this.setState({ hintSquares })
    }
  }

  canDragDrop (from, to) {
    return !!this.selectMoves(from, to)
  }

  isMovePossible (from, to) {
    return !!this.props.moves.find(x => (x.begin() === from && x.end() === to))
  }

  renderSquare (n) {
    const row = Math.floor(n / 8)
    const column = n % 8

    const black = ((row + column) % 2 === 1)

    let num = null
    let piece = null
    if (black) {
      num = row * 4 + Math.floor(column / 2)

      const markedForCapture = this.state.markedSquaresForCapture.includes(num)

      const canDrag = this.props.canSelectMove && _.some(this.props.moves, x => x.begin() === num)

      piece = (
        <DragPiece
          square={num}
          markedForCapture={markedForCapture}
          canDrag={canDrag}
          onPieceDrop={this.pieceDrop}
        />
      )
    }

    return (
      <div key={n} style={{ width: '12.5%' }}>
        <DropSquare
          number={num}
          onHoverDropSquare={this.hoverDropSquare}
          isDropPossible={this.canDragDrop}
          isHinted={this.state.hintSquares.includes(num)}
          isMovePossible={this.isMovePossible}
        >
          { piece }
        </DropSquare>
      </div>
    )
  }

  render () {
    const squares = []
    for (let i = 0; i < 64; ++i) {
      squares.push(this.renderSquare(i))
    }

    return (
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        { squares }
      </div>
    )
  }
}

Board.propTypes = {
  onPieceMove: PropTypes.func.isRequired,
  moves: PropTypes.arrayOf(PropTypes.object)
}

function mapDispatchToProps (dispatch) {
  return {
    onPieceMove: (move) => {
      return dispatch(movePiece(move))
    }
  }
}

function mapStateToProps (state, ownProps) {
  const nextPlayer = state.board.turn === 'W' ? 'white' : 'black'

  return {
    moves: possibleMovesSelector(state),
    canSelectMove: state[nextPlayer] === 'human'
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board)
