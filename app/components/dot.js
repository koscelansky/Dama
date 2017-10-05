import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Circle from './circle';

export default class Dot extends Component {
    render() {
  
      return (
        <Circle color='red'>
          <div style={{ margin: '12%' }}>
            <Circle color='blue' />
          </div>
        </Circle>
      );
    }
  }
