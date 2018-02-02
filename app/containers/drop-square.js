import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DropTarget } from 'react-dnd'
import { appState } from '../app.js'
import Square from '../components/square'
import DragMarker from '../components/drag-marker'
import { possibleMovesSelector } from '../selectors'
import _ from 'lodash'

function selectMoves (from, to, hint = []) {
  const moves = possibleMovesSelector(appState.getState())

  let result = []
  for (const move of moves) {
    if (move.begin() === from && move.end() === to) {
      result.push(move)
    }
  }

  if (result.length > 1) {
    // there are more then one way to go to to squares :)
    // use hint to compute which move is the best match
    let ranked = result.map(move => {
      let rank = 0
      for (const i of hint) {
        if (move.squares.includes(i)) {
          rank++
        }
      }
      return { move, rank }
    })

    ranked.sort((a, b) => a.rank - b.rank).reverse()
    if (ranked[0].rank > ranked[1].rank) {
      result = [ranked[0].move]
    } else {
      // so rank is equal we need to prioritize simple moves and then shorter moves
      const simple = ranked.find(x => !x.move.isCapture())
      if (simple) {
        result = [simple]
      } else {
        const shortest = _
          .takeWhile(ranked, x => x.rank === ranked[0].rank)
          .map(x => x.move)
          .sort((a, b) => a.squares.length - b.squares.length)
        if (shortest[0].squares.length < shortest[1].squares.length) {
          result = [shortest[0]]
        }
      }
    }
  }

  return result
}

const dropTarget = {
  drop (props, monitor) {
    const moves = selectMoves(monitor.getItem().square, props.number, props.hint)

    // disable highlighting of pieces for capture and drop hints, null will
    // ensure this
    props.onHoverDropSquare(null)

    if (moves.length !== 1) {
      throw new Error('Ambiguous move selected.')
    }

    return props.onPieceMove(moves[0])
  },

  canDrop (props, monitor) {
    if (!props.number) return false // white squares are no interesting

    const from = monitor.getItem().square
    const to = props.number

    const moves = selectMoves(from, to, props.hint)

    return moves.length === 1 // only if move is certain use it
  }
}

function collect (connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
    originSquare: monitor.getItem() ? monitor.getItem().square : null
  }
}

class DropSquare extends Component {
  render () {
    const { connectDropTarget, isOver, canDrop, number } = this.props
    let fill = number !== null ? 'sienna' : 'blanchedalmond'

    const canDropMarker = canDrop ? (
      <div style={{ padding: '39%' }}>
        <DragMarker marked={isOver} />
      </div>
    ) : null

    const label = number === null ? null : number + 1

    return connectDropTarget(
      <div>
        <Square label={label} fill={fill}>
          { this.props.children }
          { canDropMarker }
        </Square>
      </div>
    )
  }

  componentDidUpdate (prevProps) {
    if (this.props.isOver && this.props.originSquare === this.props.number) {
      // remove hint if hovering the origin square
      this.props.onHoverDropSquare(null)
    }

    if (!this.props.canDrop) return

    if (prevProps.isOver === this.props.isOver) return

    if (this.props.isOver) {
      const from = this.props.originSquare
      const to = this.props.number

      const moves = selectMoves(from, to, this.props.hint)
      if (moves.length === 1) {
        this.props.onHoverDropSquare(moves[0])
        return
      }
    }

    this.props.onHoverDropSquare()
  }
}

DropSquare.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool.isRequired,
  originSquare: PropTypes.number,
  hint: PropTypes.arrayOf(PropTypes.number),

  // number of square, if white, then null
  number: PropTypes.number,

  // function for move piece
  onPieceMove: PropTypes.func.isRequired,

  // function will be called for every hover when capture is possible
  onHoverDropSquare: PropTypes.func
}

export default DropTarget('PIECE', dropTarget, collect)(DropSquare)
