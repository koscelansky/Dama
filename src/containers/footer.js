import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components/macro'

import FenDlg from '../features/fen-dlg'

import {
  gameResultSelector,
  possibleMovesSelector
} from '../selectors'

const DivWrapper = styled.div`
  padding-left: 1em;
  text-indent: -1em;
`

class Footer extends Component {
  render () {
    const { moves, result, white, black } = this.props
    const str = moves.join(' ')

    return (
      <div>
        <DivWrapper>Result: {result}</DivWrapper>
        <DivWrapper>
          <FenDlg />
        </DivWrapper>
        <DivWrapper>Possible moves: {str}</DivWrapper>
        <DivWrapper>White: {white}</DivWrapper>
        <DivWrapper>Black: {black}</DivWrapper>
      </div>
    )
  }
}

function getPlayerStatusString (player) {
  const { type, name, ...options } = player

  const result = (() => {
    if (type === 'human') {
      return JSON.stringify({ type }, null, 1)
    } else if (type === 'ai-random') {
      return JSON.stringify({ type }, null, 1)
    } else if (type === 'ai-minmax') {
      return JSON.stringify({ type, ...options }, null, 1)
    }
  })()

  return result.replace(/-/g, String.fromCharCode(8209))
}

function mapStateToProps (state, ownProps) {
  return {
    result: gameResultSelector(state),
    moves: possibleMovesSelector(state),
    white: getPlayerStatusString(state.gameSettings.white),
    black: getPlayerStatusString(state.gameSettings.black)
  }
}

Footer.propTypes = {
  result: PropTypes.string.isRequired,
  moves: PropTypes.arrayOf(PropTypes.object).isRequired,
  black: PropTypes.string,
  white: PropTypes.string
}

export default connect(mapStateToProps)(Footer)
