import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';

import { appState } from '../app.js';
import Square from '../components/square';
import DragMarker from '../components/drag-marker';
import CaptureMark from '../components/capture-mark';
import { possibleMovesSelector } from '../selectors'

const dropTarget = {
  drop(props, monitor) {
    return props.onPieceMove(monitor.getItem().square, props.number);
  }, 

  canDrop(props, monitor) {
    if (props.number === null)
      return false; // white squares are no interesting 

    const moves = possibleMovesSelector(appState.getState());
    const from = monitor.getItem().square;
    const to = props.number;
      
    for (const move of moves) {
      if (move.squares[0] === from && move.squares[1] === to)
        return true;
    }

    return false;
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(), 
    canDrop: monitor.canDrop(),
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

    const captureMark = 0 ? ( 
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
}

DropSquare.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool.isRequired,

  // number of square, if white, then null 
  number: PropTypes.number,

  // function for move piece
  onPieceMove: PropTypes.func.isRequired,
};

export default DropTarget('PIECE', dropTarget, collect)(DropSquare);
