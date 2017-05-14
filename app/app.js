
import React from 'react';
import ReactDOM from 'react-dom';

import Board from './components/board.component';

import { fromFen } from './game';

const x = fromFen('B:B1:W2,K10');

const root = document.getElementById('root');

ReactDOM.render(
  <Board pieces={ x.pieces } />,
  root
);
