import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Modal from '../components/modal'
import NewGameDlg from './new-game-dlg'

const Caption = styled.h1`
  grid-column-start: 1;
  grid-column-end: span 2;
  place-self: center;
  margin: 10px 0 10px 0;
  font-weight: 500;
`

const WelcomeDlg = (props) => {
  if (!props.show) {
    return null
  }

  return (
    <Modal show>
      <Caption>Start new game</Caption>
      <NewGameDlg />
    </Modal>
  )
}

function mapStateToProps (state, ownProps) {
  return {
    show: state.pageLoad
  }
}

WelcomeDlg.propTypes = {
  show: PropTypes.bool
}

export default connect(mapStateToProps)(WelcomeDlg)
