
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

import Piece from '../components/piece.js';

const dragSource = {
  beginDrag(props) {
    return {
      type: props.type,
      square: props.square,
    };
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }
}

class DragPiece extends Component {
  componentDidMount() {
    this.props.connectDragPreview(getEmptyImage());
  }

  render() {
    const { connectDragSource, isDragging, type } = this.props;

    return connectDragSource(
      <div style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move'
      }}>
        <Piece type={ type } />
      </div>
    );
  }
}

DragPiece.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  connectDragPreview: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,

  // type of piece (pawn or queen with color)
  type: PropTypes.string.isRequired,

  // number of square where the piece is
  square: PropTypes.number.isRequired,
};

export default DragSource('PIECE', dragSource, collect)(DragPiece);