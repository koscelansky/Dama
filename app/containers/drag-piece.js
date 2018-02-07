import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { DragSource } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'

import Piece from '../components/piece.js'
import CaptureMark from '../components/capture-mark'

const dragSource = {
  canDrag (props, monitor) {
    return props.canDrag
  },

  beginDrag (props) {
    return {
      type: props.type,
      square: props.square
    }
  },

  endDrag (props, monitor) {
    // handling of drop is here because of drop outside of drop targets,
    // then drop is not called and we need to handle it here, so to make
    // ot consistent all drops are handled here
    if (!monitor.didDrop()) {
      props.onPieceDrop()
    } else {
      props.onPieceDrop(props.square, monitor.getDropResult().number)
    }
  }
}

function collect (connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
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
    type: state.board.pieces[ownProps.square]
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

  markedForCapture: PropTypes.bool,

  // will be called when piece is droped
  onPieceDrop: PropTypes.func.isRequired
}

export default connect(mapStateToProps)(DragSource('PIECE', dragSource, collect)(DragPiece))
