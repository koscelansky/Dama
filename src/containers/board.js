
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import styled from 'styled-components'

import DragPiece from '../containers/drag-piece'
import DropSquare from '../containers/drop-square'

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
`
const selectMoves = (from, to, moves, hinted) => {
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
      if (i === hinted[j]) {
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

const Board = ({ select, pieces, moves, huff, onPieceMove, onPieceHuff }) => {
  const [captured, setCaptured] = useState([])
  const [hinted, setHinted] = useState([])

  const handlePieceDrop = (from, to) => {
    try {
      if (select !== 'move') {
        throw new Error('We should be here!')
      }

      if (from == null || to == null) {
        return // empty drop
      }

      const move = selectMoves(from, to, moves, hinted)
      if (!move) {
        throw new Error('Ambiguous move selected.')
      }

      return onPieceMove(move)
    } finally {
      setCaptured([])
      setHinted([])
    }
  }

  const handlePieceClick = (square, event) => {
    if (select === 'huff') {
      if (huff.includes(square)) {
        onPieceHuff(square)
      } else if (event.button === 2) { // RMB
        onPieceHuff(-1)
      }
    }
  }

  const handleContextMenu = (e) => {
    e.preventDefault()
    e.stopPropagation()

    handlePieceClick(-1, e)
  }

  const handleHoverDropSquare = (from, to) => {
    if (select !== 'move') {
      throw new Error("We shouldn't be here!")
    }

    if (from === to) {
      setCaptured([])
      setHinted([])
    }

    const move = selectMoves(from, to, moves, hinted)

    const capturedSquares = move ? _.sortBy([...move.getCapturedSquares()]) : []

    if (!_.isEqual(capturedSquares, captured)) {
      setCaptured(capturedSquares)
    }

    // undefined means do not touch hints (hover over white space...)
    if (!move) return

    const hint = move.end()
    const hintSquares = [...hinted]

    while (hintSquares.length > 0 &&
      !move.squares.includes(_.last(hintSquares))) {
      hintSquares.pop()
    }

    if (_.last(hintSquares) !== hint) {
      hintSquares.push(hint)
    }

    if (!_.isEqual(hintSquares, hinted)) {
      setHinted(hintSquares)
    }
  }

  const isDropPossible = (from, to) => {
    return select === 'move' && !!selectMoves(from, to, moves, hinted)
  }

  const isMovePossible = (from, to) => {
    return select === 'move' && !!moves.find(x => (x.begin() === from && x.end() === to))
  }

  const renderSquare = (n) => {
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
          if (select === 'move' && captured.includes(num)) {
            return 'capture'
          } else if (select === 'huff' && huff.includes(num)) {
            return 'huff'
          } else {
            return null
          }
        })()

        const moveable = select === 'move' && _.some(moves, x => x.begin() === num)

        piece = (
          <DragPiece
            type={type}
            square={num}
            mark={mark}
            moveable={moveable}
            onPieceDrop={handlePieceDrop}
            onPieceClick={handlePieceClick}
          />
        )
      }
    }

    return (
      <DropSquare
        key={n}
        number={num}
        onHoverDropSquare={handleHoverDropSquare}
        isDropPossible={isDropPossible}
        isHinted={hinted.includes(num)}
        isMovePossible={isMovePossible}
      >
        {piece}
      </DropSquare>
    )
  }

  const squares = []
  for (let i = 0; i < 64; ++i) {
    squares.push(renderSquare(i))
  }

  return (
    <GridWrapper onContextMenu={handleContextMenu}>
      {squares}
    </GridWrapper>
  )
}

Board.propTypes = {
  onPieceMove: PropTypes.func.isRequired,
  onPieceHuff: PropTypes.func.isRequired,
  moves: PropTypes.arrayOf(PropTypes.object),
  pieces: PropTypes.arrayOf(PropTypes.string).isRequired,

  // moves or huff is filled, in case of show board is just readonly
  select: PropTypes.oneOf(['huff', 'move', 'show']).isRequired
}

export default Board
