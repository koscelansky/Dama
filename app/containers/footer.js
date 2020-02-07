import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { showFen } from '../actions'

import {
  gameResultSelector,
  possibleMovesSelector
} from '../selectors'

const DivWrapper = styled.div`
  padding-left: 1em;
  text-indent: -1em;
`

class Footer extends Component {
  constructor (props) {
    super(props)
    this.handleFenClick = this.handleFenClick.bind(this)
  }

  handleFenClick (event) {
    this.props.onFenClick()
    event.preventDefault()
  }

  render () {
    const { moves, result, white, black, history } = this.props
    const str = moves.join(' ')

    return (
      <div>
        <DivWrapper>Result: {result}</DivWrapper>
        <DivWrapper>
          <button onClick={this.handleFenClick}>Show FEN</button>
        </DivWrapper>
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
    white: getPlayerStatusString(state.white),
    black: getPlayerStatusString(state.black),
    history: getMoveHistory(state.history)
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onFenClick: () => {
      return dispatch(showFen())
    }
  }
}

Footer.propTypes = {
  result: PropTypes.string.isRequired,
  moves: PropTypes.arrayOf(PropTypes.object).isRequired,
  black: PropTypes.string,
  white: PropTypes.string,
  history: PropTypes.string,
  onFenClick: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer)
