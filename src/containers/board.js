
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import styled from 'styled-components'

import DragPiece from '../containers/drag-piece'
import DropSquare from '../containers/drop-square'

const Gridwrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
`

export default class Board extends Component {
  constructor (props) {
    super(props)
    this.handleHoverDropSquare = this.handleHoverDropSquare.bind(this)
    this.handlePieceDrop = this.handlePieceDrop.bind(this)
    this.handlePieceClick = this.handlePieceClick.bind(this)
    this.canDragDrop = this.canDragDrop.bind(this)
    this.isMovePossible = this.isMovePossible.bind(this)
    this.handleContextMenu = this.handleContextMenu.bind(this)

    this.state = {
      captureSquares: [],
      hintSquares: []
    }
  }

  resetState () {
    const newState = {
      captureSquares: [],
      hintSquares: []
    }

    if (!_.isEqual(this.state, newState)) {
      this.setState(newState)
    }
  }

  selectMoves (from, to) {
    const { moves } = this.props
    const hint = this.state.hintSquares

    const possibleMoves = moves.filter(x => x.begin() === from && x.end() === to)
    if (possibleMoves.length === 0) {
      return null
    }

    if (possibleMoves.length === 1) {
      return possibleMoves[0] // only one move is possible to selected square
    }

    // there are more then one way to go to to squares :)
    // use hint to compute which move is the best match
    const rankedMoves = possibleMoves.map(move => {
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

  handlePieceDrop (from, to) {
    try {
      if (this.props.select !== 'move') {
        throw new Error('We should be here!')
      }

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

  handlePieceClick (square, events) {
    const { select, huff } = this.props

    if (select === 'huff') {
      if (huff.includes(square)) {
        this.props.onPieceHuff(square)
      } else if (events.button === 2) { // RMB
        this.props.onPieceHuff(-1)
      }
    }
  }

  handleContextMenu (e) {
    e.preventDefault()
    e.stopPropagation()

    this.pieceClick(-1, e)
  }

  handleHoverDropSquare (from, to) {
    if (this.props.select !== 'move') {
      throw new Error('We shouldn\'t be here!')
    }

    if (from === to) {
      this.resetState()
    }

    const move = this.selectMoves(from, to)

    const capturedSquares = move ? _.sortBy([...move.getCapturedSquares()]) : []

    if (!_.isEqual(capturedSquares, this.state.captureSquares)) {
      this.setState({ captureSquares: capturedSquares })
    }

    // undefined means do not touch hints (hover over white space...)
    if (!move) return

    const hint = move.end()
    const hintSquares = [...this.state.hintSquares]

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
    return this.props.select === 'move' && !!this.selectMoves(from, to)
  }

  isMovePossible (from, to) {
    const { select, moves } = this.props

    return select === 'move' && !!moves.find(x => (x.begin() === from && x.end() === to))
  }

  renderSquare (n) {
    const { moves, huff, select, pieces } = this.props

    const row = Math.floor(n / 8)
    const column = n % 8

    const black = ((row + column) % 2 === 1)

    let num = null
    let piece = null
    if (black) {
      num = row * 4 + Math.floor(column / 2)

      const type = pieces[num]
      if (type != null) {
        const mark = (() => {
          if (select === 'move' && this.state.captureSquares.includes(num)) {
            return 'capture'
          } else if (select === 'huff' && huff.includes(num)) {
            return 'huff'
          } else {
            return null
          }
        })()

        const canDrag = select === 'move' && _.some(moves, x => x.begin() === num)

        piece = (
          <DragPiece
            type={type}
            square={num}
            mark={mark}
            canDrag={canDrag}
            onPieceDrop={this.handlePieceDrop}
            onPieceClick={this.handlePieceClick}
          />
        )
      }
    }

    return (
      <DropSquare
        key={n}
        number={num}
        onHoverDropSquare={this.handleHoverDropSquare}
        isDropPossible={this.canDragDrop}
        isHinted={this.state.hintSquares.includes(num)}
        isMovePossible={this.isMovePossible}
      >
        {piece}
      </DropSquare>
    )
  }

  render () {
    const squares = []
    for (let i = 0; i < 64; ++i) {
      squares.push(this.renderSquare(i))
    }

    return (
      <Gridwrapper onContextMenu={this.handleContextMenu}>
        {squares}
      </Gridwrapper>
    )
  }
}

Board.propTypes = {
  onPieceMove: PropTypes.func.isRequired,
  onPieceHuff: PropTypes.func.isRequired,
  moves: PropTypes.arrayOf(PropTypes.object),
  pieces: PropTypes.arrayOf(PropTypes.string).isRequired,

  // moves or huff is filled, in case of show board is just readonly
  select: PropTypes.oneOf(['huff', 'move', 'show']).isRequired
}
