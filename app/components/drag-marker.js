import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Circle from './circle'

export default class DragMarker extends Component {
  render () {
    const { type } = this.props
    const [color, shadow] = (() => {
      switch (type) {
        case 'can-drop': return ['red', '0px 0px 7px red']
        case 'can-drop-over': return ['red', '0px 0px 10px blue']
      }
    })()

    if (!color || !shadow) return null

    return (
      <Circle color={color} shadow={shadow}>
        <div style={{ margin: '10%' }}>
          <Circle color='orange' blur='3px' />
        </div>
      </Circle>
    )
  }
}

DragMarker.propTypes = {
  type: PropTypes.string.isRequired
}
