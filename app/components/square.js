
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Square extends Component {
  render() {
    const black = this.props.black;
    const fill = black ? 'sienna' : 'blanchedalmond';

    const number = this.props.num;

    const numberStyle = {
      position: 'absolute',
      right: 0,
      margin: '3%',
      paddingRight: '0.1em', /* small fix to get the position right */
      lineHeight: '1em',
      fontSize: '2.5vw',
      fontFamily: 'Arial',
      color: 'white', 
      userSelect: 'none', 
      cursor: 'default'
    };

    const contentStyle = {
      position: 'absolute', 
      width: '100%', 
      height: '100%'
    };

    return (
      <div style={{ backgroundColor: fill }}>
        <div style={{ position: 'relative' }}>
          <div style={ numberStyle }>{ number }</div>
          <div style={ contentStyle }>{ this.props.children }</div>
        </div>
        <div style={{ paddingBottom: '100%', display: 'block' }}></div>
      </div>
    );
  }
}

Square.propTypes = {
  black: PropTypes.bool, 
  num: PropTypes.number
};