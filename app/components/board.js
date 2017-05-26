
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Square from './square';
import Pawn from './pawn';
import Queen from './queen';
import DragPiece from '../containers/drag-piece';

export default class Board extends Component {
  renderSquare(n) {
    const row = Math.floor(n / 8);
    const column = n % 8;
    
    const black = ((row + column) % 2 === 1);  

    let num = null;
    let piece = null;
    let onSquareClick = null;
    if (black) {
      const squareNo = row * 4 + Math.floor(column / 2);

      piece = (
        <DragPiece type={ this.props.pieces[squareNo] } />
      );

      num = squareNo + 1;
      onSquareClick = () => { this.props.onBlackSquareClick(squareNo) };
    }

    return (
      <div key={ n } style={{ width: '12.5%' }} onClick={ onSquareClick }>
        <Square number={ num }>
          { piece }
        </Square>
      </div>
    );
  }
  
  render() {
    const squares = [];
    for (let i = 0; i < 64; ++i) {
      squares.push(this.renderSquare(i));
    }

    return (
      <div style={{ margin: '1vw', display: 'flex', flexWrap: 'wrap' }}>
        { squares }
      </div>
    );
  }
}

Board.propTypes = {
  pieces: PropTypes.arrayOf(PropTypes.string)
};
