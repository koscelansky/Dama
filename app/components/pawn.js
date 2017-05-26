
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Pawn extends Component {
  render() {
    const { black } = this.props;
    const pic = './svg/' + (black ? 'Chess_pdt45.svg' : 'Chess_plt45.svg');

    const objectStyle = {
      userSelect: 'none',
      pointerEvents: 'none',
    };

    return (
      <object type="image/svg+xml" data={ pic }  style={ objectStyle }></object>
    );
  }
}

Pawn.propTypes = {
  black: PropTypes.bool
};