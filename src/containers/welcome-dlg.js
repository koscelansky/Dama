import React from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-bootstrap/Modal'

import NewGameDlg from './new-game-dlg'

const WelcomeDlg = ({ show }) => {
  return (
    <Modal dialogClassName='welcome-dlg' show={show} onHide={() => {}} centered>
      <Modal.Header>
        <Modal.Title>Start new game</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <NewGameDlg />
      </Modal.Body>
    </Modal>
  )
}

WelcomeDlg.propTypes = {
  show: PropTypes.bool
}

export default WelcomeDlg
