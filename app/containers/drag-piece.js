import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { DragSource } from 'react-dnd'
import styled from 'styled-components'

import Piece from '../components/piece.js'
import CaptureMark from '../components/capture-mark.js'
import HuffMark from '../components/huff-mark.js'

const PieceWrapper = styled.div`
  position: absolute;
  width: 100%;
  z-Index: 1;
  ${({ active }) => active && `filter: drop-shadow(0 0 2px orange);`}

  &:hover {
    ${({ active }) => active && `filter: drop-shadow(0 0 5px blue);`}
  }
`

const MarkWrapper = styled.div`
  position: absolute;
  width: 100%;
  z-index: 2;
  opacity: 0.8;

  &:hover {
    filter: drop-shadow(0 0 2px orange);
  }
`

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
  constructor (props) {
    super(props)

    this.onClick = this.onClick.bind(this)
  }

  onClick (e) {
    e.preventDefault()
    e.stopPropagation()

    this.props.onPieceClick(this.props.square, e)
  }

  render () {
    const { connectDragSource, isDragging, canDrag, type } = this.props

    if (type == null) {
      return null
    }

    const mark = (() => {
      switch (this.props.mark) {
        case 'capture': return <CaptureMark />
        case 'huff': return <HuffMark />
        default: return null
      }
    })()

    return connectDragSource(
      <div style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: canDrag ? 'move' : 'default'
      }}>
        <PieceWrapper active={canDrag && !isDragging}>
          <Piece type={type} />
        </PieceWrapper>
        <MarkWrapper onClick={this.onClick}>
          { mark }
        </MarkWrapper>
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

  mark: PropTypes.oneOf(['capture', 'huff']),

  // will be called when piece is droped
  onPieceDrop: PropTypes.func.isRequired,

  // will be called upon piece click
  onPieceClick: PropTypes.func.isRequired
}

export default connect(mapStateToProps)(DragSource('PIECE', dragSource, collect)(DragPiece))
