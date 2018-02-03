import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DropTarget } from 'react-dnd'
import Square from '../components/square'
import DragMarker from '../components/drag-marker'

const dropTarget = {
  drop (props, monitor) {
    return props.onPieceDrop(monitor.getItem().square, props.number)
  },

  canDrop (props, monitor) {
    if (!props.number) return false // white squares are no interesting

    const from = monitor.getItem().square
    const to = props.number

    return props.onCanDrop(from, to)
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
        <DragMarker type={isOver ? 'can-drop-over' : 'can-drop'} />
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
  hint: PropTypes.arrayOf(PropTypes.number),

  // number of square, if white, then null
  number: PropTypes.number,

  // function for move piece
  onPieceDrop: PropTypes.func.isRequired,

  // function will be called for every hover when capture is possible
  onHoverDropSquare: PropTypes.func.isRequired,

  onCanDrop: PropTypes.func.isRequired
}

export default DropTarget('PIECE', dropTarget, collect)(DropSquare)
