import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Dot extends Component {
    render() {
      const { color } = this.props;
      
      const objectStyle = {
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        background: color, 
        display: 'block'
      };
  
      return (
        <div style={ objectStyle }>
          <div style={{ paddingBottom: '100%', display: 'block' }}></div>
        </div>
      );
    }
  }
  
  Dot.propTypes = {
    color: PropTypes.string
  };