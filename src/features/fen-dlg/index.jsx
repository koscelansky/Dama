import { useId, useState } from 'react'
import { useSelector } from 'react-redux'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import { toFenSelector } from '../../selectors'

const FenDlg = () => {
  const fenControlId = useId()
  const [show, setShow] = useState(false)
  const [status, setStatus] = useState(null)

  const fen = useSelector(state => toFenSelector(state))

  const copyFen = () => {
    navigator.clipboard
      .writeText(fen)
      .then(() => setStatus('success'))
      .catch(() => setStatus('failure'))
  }

  const text = (() => {
    switch (status) {
      case 'success':
        return <span className='text-success'>Copied</span>
      case 'failure':
        return <span className='text-danger'>Failed</span>
      default:
        return null
    }
  })()

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>FEN</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId={fenControlId}>
            <Form.Label className='visually-hidden'>Current FEN</Form.Label>
            <Form.Control type='text' value={fen} readOnly />
          </Form.Group>
          <div className='mt-2'>
            <Button onClick={copyFen}>Copy</Button>&nbsp;
            <span className='mx-2 d-inline-block align-middle'>{text}</span>
          </div>
        </Modal.Body>
      </Modal>
      <Button onClick={handleShow}>Show FEN</Button>
    </>
  )
}

export default FenDlg
