import React from 'react'
import PropTypes from 'prop-types'
import { useDrop } from 'react-dnd'
import Square from './square'
import DragMarker from './drag-marker'

const DropSquare = ({ children, number, isHinted, onHoverDropSquare, isMovePossible, isDropPossible }) => {
  const [{ isOver, canDrop, origin }, drop] = useDrop({
    accept: 'PIECE',
    drop: () => ({ number }),
    canDrop (item) {
      if (number == null) return false // white squares are no interesting

      const from = item.square
      const to = number

      return isDropPossible(from, to)
    },
    hover: (item, monitor) => {
      // this check will ensure we will only call this once, since the react dnd
      // seems to do this first and than, it will update the collected props.
      // if it would do it differently, it will break the code, since we will
      // never get isOver to false
      if (isOver) return

      const from = item.square
      const to = number

      // from == to is there to also reset hints and captures, otherwise
      // there is no way how to know we are back to the square we started
      if (monitor.canDrop() || from === to) {
        onHoverDropSquare(from, to)
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      origin: monitor.getItem() ? monitor.getItem().square : null
    })
  })

  const dragMarkerStyle = (() => {
    if (canDrop && isOver) {
      return 'can-drop-over'
    } else if (canDrop && isHinted) {
      return 'can-drop-hint'
    } else if (canDrop) {
      return 'can-drop'
    } else if (isMovePossible(origin, number)) {
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

  return (
    <div ref={drop}>
      <Square label={label} fill={fill}>
        {children}
        {canDropMarker}
      </Square>
    </div>
  )
}

DropSquare.propTypes = {
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

export default DropSquare
