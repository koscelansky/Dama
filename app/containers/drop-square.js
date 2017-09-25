import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';

import { appState } from '../app.js';
import Square from '../components/square';
import { canPieceMoveTo } from '../game_logic/possible-moves.js'; 

const dropTarget = {
  drop(props, monitor) {
    return props.onPieceMove(monitor.getItem().square, props.number);
  }, 
  canDrop(props, monitor) {
    if (props.number === null)
      return false; // white squares are no interesting 

    return canPieceMoveTo(appState.getState(), monitor.getItem().square, props.number);
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
    let fill = 'blanchedalmond';

    if (number !== null) {
      fill = isOver && canDrop ? 'red' : 'sienna';
    }

    let label = number === null ? null : number + 1;

    return connectDropTarget(
      <div>
        <Square label={ label } fill={ fill }>
          { this.props.children }
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
