import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { toFen } from '../fen'

class FenForm extends Component {
  render () {
    return (
      <div>
        Fen: { this.props.fen }
      </div>
    )
  }
}

function mapStateToProps (state, ownProps) {
  return {
    fen: toFen(state)
  }
}

FenForm.propTypes = {
  fen: PropTypes.string
}

export default connect(mapStateToProps)(FenForm)
