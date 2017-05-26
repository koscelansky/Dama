
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import HTML5Backend from 'react-dnd-html5-backend';
import MouseBackEnd from 'react-dnd-mouse-backend'
import { DragDropContext } from 'react-dnd';

import DamaBoard from './containers/dama-board';
import damaApp from './reducers';
import CustomDragLayer from './drag-layer';

class App extends Component {
  render() {
    return (
      <div> 
        <DamaBoard />
        <CustomDragLayer />
      </div>
    );
  }
}

App = DragDropContext(MouseBackEnd)(App);

ReactDOM.render(
  <Provider store={ createStore(damaApp) }>
    <App />
  </Provider>,
  document.getElementById('root')
);
