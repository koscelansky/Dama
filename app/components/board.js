
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import DragPiece from '../containers/drag-piece'
import DropSquare from '../containers/drop-square'

export default class Board extends Component {
  constructor (props) {
    super(props)
    this.hoverDropSquare = this.hoverDropSquare.bind(this)
    this.state = {
      markedSquaresForCapture: [],
      hintSquares: []
    }
  }

  hoverDropSquare (move) {
    const capturedSquares = move ? _.sortBy([...move.getCapturedSquared()]) : []

    if (!_.isEqual(capturedSquares, this.state.markedSquaresForCapture)) {
      this.setState({ markedSquaresForCapture: capturedSquares })
    }

    // undefined means do not touch hints (hover over white space...)
    if (move === undefined) return

    if (move) {
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
        console.log(hintSquares)
      }
    } else {
      if (!_.isEqual([], this.state.hintSquares)) {
        this.setState({ hintSquares: [] })
        console.log([])
      }
    }
  }

  renderSquare (n) {
    const row = Math.floor(n / 8)
    const column = n % 8

    const black = ((row + column) % 2 === 1)

    let num = null
    let piece = null
    if (black) {
      const squareNo = row * 4 + Math.floor(column / 2)

      num = squareNo

      const markedForCapture = this.state.markedSquaresForCapture.includes(num)
      piece = (<DragPiece square={squareNo} markedForCapture={markedForCapture} />)
    }

    return (
      <div key={n} style={{ width: '12.5%' }}>
        <DropSquare
          number={num}
          hint={this.state.hintSquares}
          onPieceMove={this.props.onPieceMove}
          onHoverDropSquare={this.hoverDropSquare}
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
  onPieceMove: PropTypes.func.isRequired
}
