import React, { Component } from 'react';

export default class CaptureMark extends Component {
  render() {
    const objectStyle = {
      userSelect: 'none',
      pointerEvents: 'none',
      width: '100%',
    };

    return (
      <object type="image/svg+xml" data='./svg/capture-mark.svg'  style={ objectStyle } />
    );
  }
}
