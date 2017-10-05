import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Circle from './circle';

export default class DragMarker extends Component {
  render() {
    const { marked } = this.props;
    const shadow = marked ? '0px 0px 10px blue' : '0px 0px 7px red';

    return (
      <Circle color='red' shadow={ shadow }>
        <div style={{ margin: '10%' }}>
          <Circle color='orange' blur='3px' />
        </div>
      </Circle>
    );
  }
}

DragMarker.propTypes = {
  marked: PropTypes.bool
};