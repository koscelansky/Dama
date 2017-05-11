
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Queen extends Component {
  render() {
    const { black } = this.props;
    const pic = 'public/svg/' + (black ? 'Chess_qdt45.svg' : 'Chess_qlt45.svg');

    const objectStyle = {
      margin: '12%',
      userSelect: 'none'
    };

    return (
      <object type="image/svg+xml" data={ pic }  style={ objectStyle }></object>
    );
  }
}

Queen.propTypes = {
  black: PropTypes.bool
};