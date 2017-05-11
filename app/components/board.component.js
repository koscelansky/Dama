
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
    const squareNo = black ? (row * 4 + Math.floor(column / 2)) : null;
    const key = black ? squareNo : 100 + n;

    var num = null;
    var piece = null;
    if (black) {
      if (this.props.black.pawns.indexOf(squareNo) > -1)
        piece = <Pawn black/>;
      else if (this.props.white.pawns.indexOf(squareNo) > -1)
        piece = <Pawn />;
      else if (this.props.black.queens.indexOf(squareNo) > -1)
        piece = <Queen black/>;
      else if (this.props.white.queens.indexOf(squareNo) > -1)
        piece = <Queen />;

      num = squareNo + 1;
    }

    return (
      <div key={ key } style={{ width: '12.5%' }}>
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
  white: PropTypes.shape({
    pawns: PropTypes.arrayOf(PropTypes.number),
    queens: PropTypes.arrayOf(PropTypes.number)
  }),
  black: PropTypes.shape({
    pawns: PropTypes.arrayOf(PropTypes.number),
    queens: PropTypes.arrayOf(PropTypes.number)
  }),
};

Board.defaultProps = {
  white: {
    pawns: [0, 1, 2, 3, 4, 5, 6, 7], 
    queens: []
  },
  black: {
    pawns: [24, 25, 26, 27, 28, 29, 30, 31], 
    queens: []
  }, 
};