
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SquareLabel from './square-label';

export default class Square extends Component {
  render() {
    const { fill, number } = this.props;// ? 'sienna' : 'blanchedalmond';

    const labelStyle = {
      fontSize: '2.5vw',
      position: 'absolute',
      right: 0,
      margin: '4% 7%',
    };

    const contentStyle = {
      position: 'absolute', 
      width: '100%', 
      height: '100%', 
    };

    return (
      <div style={{ backgroundColor: fill }}>
        <div style={{ position: 'relative' }}>
          <div style={ labelStyle }>
            <SquareLabel>{ number }</SquareLabel>
          </div>
          <div style={ contentStyle }><div style={ {margin: '12%'} }>{ this.props.children }</div></div>
        </div>
        <div style={{ paddingBottom: '100%', display: 'block' }}></div>
      </div>
    );
  }
}

Square.propTypes = {
  fill: PropTypes.string.isRequired,
  number: PropTypes.number
};