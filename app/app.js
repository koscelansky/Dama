
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import DamaBoard from './containers/dama-board';
import damaApp from './reducers';

class App extends Component {
  render() {
    return ( <DamaBoard /> );
  }
}

App = DragDropContext(HTML5Backend)(App);

ReactDOM.render(
  <Provider store={ createStore(damaApp) }>
    <App />
  </Provider>,
  document.getElementById('root')
);
