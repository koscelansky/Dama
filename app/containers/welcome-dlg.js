import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Modal from '../components/modal'
import NewGameDlg from './new-game-dlg'

const WelcomeDlg = (props) => {
  if (!props.show) {
    return null
  }

  return (
    <Modal show caption='Start new game'>
      <NewGameDlg />
    </Modal>
  )
}

function mapStateToProps (state, ownProps) {
  return {
    show: state.pageState === 'new'
  }
}

WelcomeDlg.propTypes = {
  show: PropTypes.bool
}

export default connect(mapStateToProps)(WelcomeDlg)
