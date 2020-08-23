
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import styled from 'styled-components/macro'

import DragLayer from './drag-layer'
import DragPiece from './drag-piece'
import DropSquare from './drop-square'

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
`
const selectMoves = (from, to, moves, hinted, huffed) => {
  const possibleMoves = moves
    .filter(x => x.begin() === from && x.end() === to)
    .filter(x => x.huff === huffed)

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

const getPiecesToHuff = (moves) => {
  return [...new Set(moves.filter(x => x.huff != null).map(x => x.huff))]
}

const Board = ({ active, pieces, moves, onPieceMove }) => {
  const [captured, setCaptured] = useState([])
  const [hinted, setHinted] = useState([])

  // index of huffed squuare, or null if nothing is huffed
  const [huffed, setHuffed] = useState(null)

  useEffect(() => {
    setHuffed(null)
  }, [moves])

  const allowedHuff = huffed == null ? getPiecesToHuff(moves) : []
  const displayedPieces = (() => {
    if (huffed == null) return pieces

    const result = [...pieces]
    result[huffed] = null
    return result
  })()

  const handlePieceDrop = (from, to) => {
    try {
      if (!active) {
        throw new Error('We should be here!')
      }

      if (from == null || to == null) {
        return // empty drop
      }

      const move = selectMoves(from, to, moves, hinted, huffed)
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
    if (active) {
      if (allowedHuff.includes(square)) {
        setHuffed(square)
      } else if (event.button === 2) { // RMB
        setHuffed(null)
      }
    }
  }

  const handleContextMenu = (e) => {
    e.preventDefault()
    e.stopPropagation()

    handlePieceClick(null, e)
  }

  const handleHoverDropSquare = (from, to) => {
    if (!active) {
      throw new Error("We shouldn't be here!")
    }

    if (from === to) {
      captured.length !== 0 && setCaptured([])
      hinted.length !== 0 && setHinted([])
      return
    }

    const move = selectMoves(from, to, moves, hinted, huffed)
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
    return active && !!selectMoves(from, to, moves, hinted, huffed)
  }

  const isMovePossible = (from, to) => {
    return active && !!moves.find(x => (x.begin() === from && x.end() === to))
  }

  const renderSquare = (n) => {
    const row = Math.floor(n / 8)
    const column = n % 8

    const black = ((row + column) % 2 === 1)

    let num = null
    let piece = null
    if (black) {
      num = row * 4 + Math.floor(column / 2)

      const type = displayedPieces[num]
      if (type != null) {
        const mark = (() => {
          if (active && captured.includes(num)) {
            return 'capture'
          } else if (active && allowedHuff.includes(num)) {
            return 'huff'
          } else {
            return null
          }
        })()

        const moveable = active && _.some(moves, x => x.begin() === num)

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
    <>
      <DragLayer />
      <GridWrapper onContextMenu={handleContextMenu}>
        {squares}
      </GridWrapper>
    </>
  )
}

Board.propTypes = {
  onPieceMove: PropTypes.func.isRequired,
  moves: PropTypes.arrayOf(PropTypes.object),
  pieces: PropTypes.arrayOf(PropTypes.string).isRequired,

  // moves or huff is filled, in case of show board is just readonly
  active: PropTypes.bool.isRequired
}

export default Board
