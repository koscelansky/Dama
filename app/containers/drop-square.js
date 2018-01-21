import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import { getSquaresBetween } from '../game_logic/possible-moves'
import { appState } from '../app.js';
import Square from '../components/square';
import DragMarker from '../components/drag-marker';
import CaptureMark from '../components/capture-mark';
import { possibleMovesSelector } from '../selectors'

function selectMove(from, to) {
  const moves = possibleMovesSelector(appState.getState());
  
  for (const move of moves) {
    if (move.squares[0] === from && move.squares[1] === to)
      return move;
  }

  return null;
}

const dropTarget = {
  drop(props, monitor) {
    props.onHoverCapture([]); // disable highlighting of pieces for capture

    return props.onPieceMove(monitor.getItem().square, props.number);
  },

  canDrop(props, monitor) {
    if (props.number === null)
      return false; // white squares are no interesting 

    const from = monitor.getItem().square;
    const to = props.number;
    
    const move = selectMove(from, to);

    return move ? true : false;
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(), 
    canDrop: monitor.canDrop(),
    originSquare: monitor.getItem() ? monitor.getItem().square : null,
  };
}

class DropSquare extends Component {
  render() {
    const { connectDropTarget, isOver, canDrop, number } = this.props;
    let fill = number !== null ? 'sienna' : 'blanchedalmond';

    const canDropMarker = canDrop ? ( 
      <div style={{ padding: '39%' }}>
        <DragMarker marked={ isOver } />
      </div> 
    ) : null;

    const captureMark = this.props.markedForCapture ? ( 
      <div style={{ position: 'absolute', width: '100%', zIndex: '2', opacity: '0.8' }}>
        <CaptureMark />
      </div>
    ) : null;

    const label = number === null ? null : number + 1;

    return connectDropTarget(
      <div>
        <Square label={ label } fill={ fill }>
          <div style={{ position: 'absolute', width: '100%', zIndex: '1' }}>
            { this.props.children }
          </div>
          { canDropMarker }
          { captureMark }
        </Square>
      </div>
    );
  }

  componentDidUpdate(prevProps) {
    if (!this.props.canDrop)
      return; 

    if (prevProps.isOver == this.props.isOver)
      return;

    if (this.props.isOver) {
      const from = this.props.originSquare;
      const to = this.props.number;
      
      const move = selectMove(from, to);

      if (move.isCapture()) {
        this.props.onHoverCapture(move.getCapturedSquared());
        return;
      }
    }

    this.props.onHoverCapture([]);
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
  onHoverCapture: PropTypes.func,

  markedForCapture: PropTypes.bool,
};

export default DropTarget('PIECE', dropTarget, collect)(DropSquare);
