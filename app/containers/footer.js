import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import {
  gameResultSelector,
  possibleMovesSelector,
  toFenSelector
} from '../selectors'

const DivWrapper = styled.div`
  padding-left: 1em;
  text-indent: -1em;
`

class Footer extends Component {
  render () {
    const { moves, result, fen, white, black, history } = this.props
    const str = moves.join(' ')

    return (
      <div>
        <DivWrapper>Result: {result}</DivWrapper>
        <DivWrapper>FEN: {fen}</DivWrapper>
        <DivWrapper>Possible moves: {str}</DivWrapper>
        <DivWrapper>White: {white}</DivWrapper>
        <DivWrapper>Black: {black}</DivWrapper>
        <DivWrapper>History: {history}</DivWrapper>
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

function getMoveHistory (history) {
  const { fen, moves } = history
  const movesList = moves.join(' ')

  if (fen != null) {
    return 'Initial FEN ' + fen + ' moves: ' + movesList + '.'
  } else {
    return 'Moves: ' + movesList + '.'
  }
}

function mapStateToProps (state, ownProps) {
  return {
    result: gameResultSelector(state),
    moves: possibleMovesSelector(state),
    fen: toFenSelector(state),
    white: getPlayerStatusString(state.white),
    black: getPlayerStatusString(state.black),
    history: getMoveHistory(state.history)
  }
}

Footer.propTypes = {
  result: PropTypes.string.isRequired,
  moves: PropTypes.arrayOf(PropTypes.object).isRequired,
  fen: PropTypes.string.isRequired,
  black: PropTypes.string,
  white: PropTypes.string,
  history: PropTypes.string
}

export default connect(mapStateToProps)(Footer)
