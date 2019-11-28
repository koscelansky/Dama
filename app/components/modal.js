import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

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
  padding: 30px;
  z-index: 1001;
  width: 80%;
  min-width: 380px;
  max-width: 600px;
  box-sizing: border-box;
`

const Modal = (props) => {
  // Render nothing if the "show" prop is false
  if (!props.show) {
    return null
  }

  return (
    <Overlay>
      <Window>
        {props.children}
      </Window>
    </Overlay>
  )
}

Modal.propTypes = {
  show: PropTypes.bool
}

export default Modal
