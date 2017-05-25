
import React, { Component } from 'react';

export default class SquareLabel extends Component {
  render() {
    const style = {
      fontFamily: 'Arial',
      color: 'white', 
      userSelect: 'none', 
      cursor: 'default'
    };

    return (
      <div style={ style }>{ this.props.children }</div>
    );
  }
}
