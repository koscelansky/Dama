import React from 'react'
import PropTypes from 'prop-types'
import Circle from './circle'

const DragMarker = ({ type }) => {
  const [color, shadow, opacity] = (() => {
    switch (type) {
      case 'can-drop': return ['red', '0px 0px 7px red', 1]
      case 'can-drop-over': return ['red', '0px 0px 10px blue', 1]
      case 'can-drop-hint': return ['blue', '0px 0px 10px blue', 1]
      case 'is-move-possible': return ['red', '0px 0px 6px red', 0.3]
      default: throw Error('What is your drag marker type?')
    }
  })()

  if (!color || !shadow || !opacity) return null

  return (
    <div style={{ opacity }}>
      <Circle color={color} shadow={shadow}>
        <div style={{ margin: '10%' }}>
          <Circle color='orange' blur='3px' />
        </div>
      </Circle>
    </div>
  )
}

export default DragMarker

DragMarker.propTypes = {
  type: PropTypes.string.isRequired
}
