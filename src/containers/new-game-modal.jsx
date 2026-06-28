import PropTypes from 'prop-types'
import Modal from 'react-bootstrap/Modal'

import NewGameDlg from './new-game-dlg'

const NewGameModal = ({ show, onHide = () => {}, onSubmit, showCloseButton = true }) => {
  return (
    <Modal dialogClassName='new-game-dialog' show={show} onHide={onHide} centered>
      <Modal.Header closeButton={showCloseButton}>
        <Modal.Title>Start new game</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <NewGameDlg key={show ? 'new-game-open' : 'new-game-closed'} onSubmit={onSubmit} />
      </Modal.Body>
    </Modal>
  )
}

NewGameModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  showCloseButton: PropTypes.bool,
}

export default NewGameModal
