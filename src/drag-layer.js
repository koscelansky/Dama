
import React from 'react'
import { useDragLayer } from 'react-dnd'
import styled from 'styled-components/macro'

import Piece from './components/piece'

const Wrapper = styled.div`
  position: fixed;
  pointer-events: none;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 10vmin;
  height: 10vmin;
  display: ${({ show }) => (show ? 'block' : 'none')};
`

const CustomDragLayer = () => {
  const {
    itemType,
    isDragging,
    item,
    offset
  } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    offset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging()
  }))

  const renderItem = (type, item) => {
    switch (type) {
      case 'PIECE':
        return (<Piece type={item.piece} />)
      default:
        console.error('Unknow drag type!')
    }
  }

  if (!isDragging) return null

  const x = offset ? offset.x : 0
  const y = offset ? offset.y : 0

  return (
    <Wrapper style={{ transform: `translate(${x}px,${y}px)` }} show={offset != null}>
      {renderItem(itemType, item)}
    </Wrapper>
  )
}

export default CustomDragLayer
