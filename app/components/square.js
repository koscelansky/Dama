
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SquareLabel from './square-label';

export default class Square extends Component {
  render() {
    const black = this.props.black;
    const fill = black ? 'sienna' : 'blanchedalmond';

    const number = this.props.num;

    const labelStyle = {
      fontSize: '2.5vw',
      position: 'absolute',
      right: 0,
      margin: '4% 7%',
    };

    const contentStyle = {
      position: 'absolute', 
      width: '100%', 
      height: '100%'
    };

    return (
      <div style={{ backgroundColor: fill }}>
        <div style={{ position: 'relative' }}>
          <div style={ labelStyle }>
            <SquareLabel>{ number }</SquareLabel>
          </div>
          <div style={ contentStyle }>{ this.props.children }</div>
        </div>
        <div style={{ paddingBottom: '100%', display: 'block' }}></div>
      </div>
    );
  }
}

Square.propTypes = {
  //num: PropTypes.number.isRequired
};