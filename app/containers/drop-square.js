import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';

import Square from '../components/square';

const dropTarget = {
  drop(props) {
    
  }, 
  canDrop(props, monitor) {
    return props.children === null;
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

    if (number) {
      fill = isOver && canDrop ? 'red' : 'sienna';
    }

    return connectDropTarget(
      <div>
        <Square number={ number } fill={ fill }>
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
};

export default DropTarget('PIECE', dropTarget, collect)(DropSquare);
