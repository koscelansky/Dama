
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import DamaBoard from './containers/dama-board';
import damaApp from './reducers';

let store = createStore(damaApp)

const root = document.getElementById('root');

ReactDOM.render(
  <Provider store={ store }>
    <DamaBoard />
  </Provider>,
  root
);
