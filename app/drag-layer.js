
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DragLayer } from 'react-dnd'

import Piece from './components/piece'

function getItemStyles (props) {
  const { currentOffset } = props
  if (!currentOffset) {
    return {
      display: 'none'
    }
  }

  let { x, y } = currentOffset

  return {
    transform: `translate(${x}px, ${y}px)`
  }
}

class CustomDragLayer extends Component {
  renderItem (type, item) {
    switch (type) {
      case 'PIECE':
        return (<Piece type={item.type} />)
    }
  }

  render () {
    const { item, itemType, isDragging } = this.props
    if (!isDragging) return null

    const layerStyles = {
      position: 'fixed',
      pointerEvents: 'none',
      zIndex: 100,
      left: 0,
      top: 0,
      width: '10%',
      height: '10%'
    }

    return (
      <div style={layerStyles}>
        <div style={getItemStyles(this.props)}>
          { this.renderItem(itemType, item) }
        </div>
      </div>
    )
  }
}

CustomDragLayer.propTypes = {
  item: PropTypes.object,
  itemType: PropTypes.string,
  currentOffset: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }),
  isDragging: PropTypes.bool.isRequired
}

function collect (monitor) {
  return {
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging()
  }
}

export default DragLayer(collect)(CustomDragLayer)
