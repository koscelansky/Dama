import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { DragSource } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'

import { appState } from '../app.js'
import Piece from '../components/piece.js'
import CaptureMark from '../components/capture-mark'
import { possibleMovesSelector } from '../selectors'

const dragSource = {
  canDrag (props, monitor) {
    const moves = possibleMovesSelector(appState.getState())
    const from = props.square

    for (const move of moves) {
      if (move.squares[0] === from) return true
    }

    return false
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

  markedForCapture: PropTypes.bool
}

DragPiece = DragSource('PIECE', dragSource, collect)(DragPiece)

export default connect(mapStateToProps)(DragPiece)
