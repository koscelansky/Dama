
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Pawn extends Component {
  render() {
    const { black } = this.props;
    const pic = 'public/svg/' + (black ? 'Chess_pdt45.svg' : 'Chess_plt45.svg');

    return (
      <object type="image/svg+xml" data={ pic }  style={{ margin: '1.2vw' }}></object>
    );
  }
}

Pawn.propTypes = {
  black: PropTypes.bool
};