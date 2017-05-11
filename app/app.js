
import React from 'react';
import ReactDOM from 'react-dom';

import Board from './components/board.component';

ReactDOM.render(
  <div>
    <Board black={
      { 
        pawns: [24, 25, 26, 27, 28, 29, 30],
        queens: [31]
      }} />
  </div>,
  document.getElementById('root')
);