import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { toFenSelector } from '../selectors'
import { closeModal } from '../actions'
import Modal from '../components/modal'

const CopyButton = styled.button`
  display: inline-block;
`

const Success = styled.span`
  color: green;
`

const Failure = styled.span`
  color: red;
`

const FenDlg = (props) => {
  const [status, setStatus] = useState(null)

  if (!props.show) {
    return null
  }

  const fen = props.fen
  const copyFen = () => {
    navigator.clipboard.writeText(fen)
      .then(() => setStatus('success'))
      .catch(() => setStatus('failure'))
  }

  const copied = status != null
  const text = status === 'success'
    ? (<Success>Copied</Success>)
    : (<Failure>Failed</Failure>)

  return (
    <Modal show caption='FEN' onCloseClick={props.onClose}>
      <span>{fen}</span>&nbsp;
      <CopyButton onClick={copyFen}>Copy</CopyButton>&nbsp;
      {copied && <span>{text}</span>}
    </Modal>
  )
}

function mapStateToProps (state) {
  return {
    show: state.pageState === 'show-fen',
    fen: toFenSelector(state)
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onClose: () => {
      return dispatch(closeModal())
    }
  }
}

FenDlg.propTypes = {
  show: PropTypes.bool,
  fen: PropTypes.string,
  onClose: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(FenDlg)
