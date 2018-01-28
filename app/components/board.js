
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import lang from 'lodash/lang'

import DragPiece from '../containers/drag-piece'
import DropSquare from '../containers/drop-square'

export default class Board extends Component {
  constructor (props) {
    super(props)
    this.hoverCapture = this.hoverCapture.bind(this)
    this.state = { markedSquaresForCapture: [] }
  }

  hoverCapture (squares) {
    squares = [...squares].sort()
    if (!lang.isEqual(squares, this.state.markedSquaresForCapture)) {
      this.setState({ markedSquaresForCapture: squares })
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
          onPieceMove={this.props.onPieceMove}
          onHoverCapture={this.hoverCapture}
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
