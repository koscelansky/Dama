
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Square from './square.component';
import Pawn from './pawn.component';
import Queen from './queen.component';

export default class Board extends Component {
  renderSquare(n) {
    const row = Math.floor(n / 8);
    const column = n % 8;
    
    const black = ((row + column) % 2 === 1);  

    let num = null;
    let piece = null;
    if (black) {
      const squareNo = row * 4 + Math.floor(column / 2);

      piece = ((p) => {
        switch (p) {
          case 'WM': return <Pawn />;
          case 'WK': return <Queen />;
          case 'BM': return <Pawn black />;
          case 'BK': return <Queen black />;
          default: return null;
        }
      })(this.props.pieces[squareNo]);

      num = squareNo + 1;
    }

    return (
      <div key={ n } style={{ width: '12.5%' }}>
        <Square black={ black } num={ num }>
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

Board.defaultProps = {
  pieces: [
    'WM', 'WM', 'WM', 'WM',
    'WM', 'WM', 'WM', 'WM',
    null, null, null, null, 
    null, null, null, null,
    null, null, null, null,
    null, null, null, null,
    'BM', 'BM', 'BM', 'BM', 
    'BM', 'BM', 'BM', 'BM', 
  ] 
};