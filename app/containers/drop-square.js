import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DropTarget } from 'react-dnd'
import Square from '../components/square'
import DragMarker from '../components/drag-marker'

const dropTarget = {
  drop (props, monitor) {
    return { number: props.number }
  },

  canDrop (props, monitor) {
    if (props.number == null) return false // white squares are no interesting

    const from = monitor.getItem().square
    const to = props.number

    return props.isDropPossible(from, to)
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
    const { isOver, canDrop, number, isHinted, originSquare } = this.props

    const dragMarkerStyle = (() => {
      if (canDrop && isOver) {
        return 'can-drop-over'
      } else if (canDrop && isHinted) {
        return 'can-drop-hint'
      } else if (canDrop) {
        return 'can-drop'
      } else if (this.props.isMovePossible(originSquare, number)) {
        return 'is-move-possible'
      }

      return null
    })()

    const canDropMarker = dragMarkerStyle ? (
      <div style={{ padding: '39%' }}>
        <DragMarker type={dragMarkerStyle} />
      </div>
    ) : null

    const fill = number != null ? 'sienna' : 'blanchedalmond'
    const label = number != null ? number + 1 : null

    return this.props.connectDropTarget(
      <div>
        <Square label={label} fill={fill}>
          { this.props.children }
          { canDropMarker }
        </Square>
      </div>
    )
  }

  componentDidUpdate (prevProps) {
    if (prevProps.isOver === this.props.isOver) return

    const { originSquare: from, number: to } = this.props

    if (this.props.isOver) {
      this.props.onHoverDropSquare(from, to)
    }
  }
}

DropSquare.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool.isRequired,
  originSquare: PropTypes.number,

  // number of square, if white, then null
  number: PropTypes.number,

  // true if the square is hinted during the drag
  isHinted: PropTypes.bool.isRequired,

  // function will return true if some move is possible
  // (true even if the move is ambiguous)
  isMovePossible: PropTypes.func.isRequired,

  // function will be called for every hover when capture is possible
  onHoverDropSquare: PropTypes.func.isRequired,

  // function to determine if the square can be dropped to
  isDropPossible: PropTypes.func.isRequired
}

export default DropTarget('PIECE', dropTarget, collect)(DropSquare)
