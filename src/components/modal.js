import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import CloseIcon from './close-icon'

const Overlay = styled.div`
  position: fixed;
  align-items: center;
  display: flex;
  justify-content: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 50;
  z-index: 1000;
`

const Window = styled.div`
  background-color: white;
  border-radius: 5px;
  padding: 20px;
  z-index: 1001;
  width: 80%;
  min-width: 380px;
  max-width: 1000px;
  box-sizing: border-box;
  position: relative;
`

const Caption = styled.h1`
  grid-column-start: 1;
  grid-column-end: span 2;
  place-self: center;
  margin: 0 0 10px 0;
  font-weight: 500;
`

const CloseButton = styled.button`
  width: 5%;
  position: absolute;
  right: 15px;
  top: 15px;
  border-width: 0;
  background-color: Transparent;
  outline: none;
`

const Modal = (props) => {
  // Render nothing if the "show" prop is false
  if (!props.show) {
    return null
  }

  const close = props.onCloseClick != null

  return (
    <Overlay>
      <Window>
        {close && <CloseButton onClick={props.onCloseClick}><CloseIcon /></CloseButton>}
        <Caption>{props.caption}</Caption>
        <>
          {props.children}
        </>
      </Window>
    </Overlay>
  )
}

Modal.propTypes = {
  show: PropTypes.bool,
  caption: PropTypes.string,
  onCloseClick: PropTypes.func
}

export default Modal
