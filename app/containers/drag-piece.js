import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { DragSource } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'

import Piece from '../components/piece.js'
import CaptureMark from '../components/capture-mark'

const dragSource = {
  canDrag (props, monitor) {
    return props.dragPossible
  },

  beginDrag (props) {
    return {
      type: props.type,
      square: props.square
    }
  }
}

function collect (connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
    canDrag: monitor.canDrag()
  }
}

class DragPiece extends Component {
  componentDidMount () {
    this.props.connectDragPreview(getEmptyImage())
  }

  render () {
    const { connectDragSource, isDragging, canDrag, type, markedForCapture } = this.props

    if (type == null) return null

    const captureMark = markedForCapture ? (
      <div style={{ position: 'absolute', width: '100%', zIndex: '2', opacity: '0.8' }}>
        <CaptureMark />
      </div>
    ) : null

    return connectDragSource(
      <div style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: canDrag ? 'move' : 'default'
      }}>
        <div style={{ position: 'absolute', width: '100%', zIndex: '1' }}>
          <Piece type={type} />
        </div>
        { captureMark }
      </div>
    )
  }
}

function mapStateToProps (state, ownProps) {
  return {
    type: state.pieces[ownProps.square]
  }
}

DragPiece.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  connectDragPreview: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  canDrag: PropTypes.bool.isRequired,

  // type of piece (pawn or queen with color)
  type: PropTypes.string,

  // number of square where the piece is
  square: PropTypes.number.isRequired,

  dragPossible: PropTypes.bool.isRequired,

  markedForCapture: PropTypes.bool
}

export default connect(mapStateToProps)(DragSource('PIECE', dragSource, collect)(DragPiece))
