
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DamaBoard from '../containers/dama-board';
import FenForm from '../containers/fen-form';

export default class Game extends Component {
  render() {
    return (
      <div>
        <div>
          <DamaBoard />
        </div>
        <div>
          <FenForm />    
        </div>
      </div>
    );
  }
}
