import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DropTarget } from 'react-dnd'
import { appState } from '../app.js'
import Square from '../components/square'
import DragMarker from '../components/drag-marker'
import { possibleMovesSelector } from '../selectors'

function selectMoves (from, to) {
  const moves = possibleMovesSelector(appState.getState())

  let result = []
  for (const move of moves) {
    if (move.begin() === from && move.end() === to) {
      result.push(move)
    }
  }

  return result
}

const dropTarget = {
  drop (props, monitor) {
    props.onHoverCapture([]) // disable highlighting of pieces for capture

    return props.onPieceMove(monitor.getItem().square, props.number)
  },

  canDrop (props, monitor) {
    if (props.number === null) return false // white squares are no interesting

    const from = monitor.getItem().square
    const to = props.number

    const moves = selectMoves(from, to)

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
    if (!this.props.canDrop) return

    if (prevProps.isOver === this.props.isOver) return

    if (this.props.isOver) {
      const from = this.props.originSquare
      const to = this.props.number

      const moves = selectMoves(from, to)
      if (moves.length === 1) {
        const move = moves[0]
        if (move.isCapture()) {
          this.props.onHoverCapture(move.getCapturedSquared())
          return
        }
      }
    }

    this.props.onHoverCapture([])
  }
}

DropSquare.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool.isRequired,
  originSquare: PropTypes.number,

  // number of square, if white, then null
  number: PropTypes.number,

  // function for move piece
  onPieceMove: PropTypes.func.isRequired,

  // function will be called for every hover when capture is possible
  onHoverCapture: PropTypes.func
}

export default DropTarget('PIECE', dropTarget, collect)(DropSquare)
