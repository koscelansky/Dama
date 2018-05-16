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
    const { moves, result, fen } = this.props
    const str = moves.join(' ')

    return (
      <div>
        <DivWrapper>Result: {result}</DivWrapper>
        <DivWrapper>FEN: {fen}</DivWrapper>
        <DivWrapper>Possible moves: {str}</DivWrapper>
      </div>
    )
  }
}

function mapStateToProps (state, ownProps) {
  return {
    result: gameResultSelector(state),
    moves: possibleMovesSelector(state),
    fen: toFenSelector(state)
  }
}

Footer.propTypes = {
  result: PropTypes.string.isRequired,
  moves: PropTypes.arrayOf(PropTypes.object).isRequired,
  fen: PropTypes.string.isRequired
}

export default connect(mapStateToProps)(Footer)
