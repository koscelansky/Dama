import React from 'react'
import PropTypes from 'prop-types'
import { useDrag } from 'react-dnd'
import styled from 'styled-components'

import Piece from '../components/piece.js'
import CaptureMark from '../svg/capture-mark.js'
import HuffMark from '../svg/huff-mark.js'

const PieceWrapper = styled.div`
  position: absolute;
  width: 100%;
  z-index: 1;
  ${({ moveable }) => moveable && 'filter: drop-shadow(0 0 2px orange);'}

  opacity: ${({ isDragging }) => (isDragging ? 0.3 : 1)};
  cursor: ${({ moveable }) => (moveable ? 'move' : 'default')};

  &:hover {
    ${({ moveable }) => moveable && 'filter: drop-shadow(0 0 5px blue);'}
  }
`

const MarkWrapper = styled.div`
  position: absolute;
  width: 100%;
  z-index: 2;
  opacity: 0.8;

  &:hover {
    filter: drop-shadow(0 0 2px orange);
  }
`

const DragPiece = ({ canDrag: moveable, onPieceClick, onPieceDrop, square, mark, type }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { square, piece: type, type: 'PIECE' },
    end: (props, monitor) => {
      console.log('end')
      // handling of drop is here because of drop outside of drop targets,
      // then drop is not called and we need to handle it here, so to make
      // ot consistent all drops are handled here
      if (!monitor.didDrop()) {
        onPieceDrop()
      } else {
        onPieceDrop(square, monitor.getDropResult().number)
      }
    },
    canDrag: () => moveable,
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  })

  const handleClick = (e) => {
    e.preventDefault()
    e.stopPropagation()

    onPieceClick(square, e)
  }

  const overlay = (() => {
    switch (mark) {
      case 'capture': return <CaptureMark />
      case 'huff': return <HuffMark />
      default: return null
    }
  })()

  return (
    <>
      <PieceWrapper ref={drag} moveable={moveable} isDragging={isDragging}>
        <Piece type={type} />
      </PieceWrapper>
      <MarkWrapper onClick={handleClick}>
        {overlay}
      </MarkWrapper>
    </>
  )
}

DragPiece.propTypes = {
  canDrag: PropTypes.bool.isRequired,

  // type of piece (pawn or queen with color)
  type: PropTypes.string,

  // number of square where the piece is
  square: PropTypes.number.isRequired,

  mark: PropTypes.oneOf(['capture', 'huff']),

  // will be called when piece is droped
  onPieceDrop: PropTypes.func.isRequired,

  // will be called upon piece click
  onPieceClick: PropTypes.func.isRequired
}

export default DragPiece
