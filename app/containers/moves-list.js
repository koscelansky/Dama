import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { possibleMovesSelector } from '../selectors.js'

class MovesList extends Component {
  render () {
    const { moves } = this.props
    const str = moves.join(' ')

    return (
      <div>
        {str}
      </div>
    )
  }
}

function mapStateToProps (state, ownProps) {
  return {
    moves: possibleMovesSelector(state)
  }
}

MovesList.propTypes = {
  fen: PropTypes.string
}

export default connect(mapStateToProps, null)(MovesList)
