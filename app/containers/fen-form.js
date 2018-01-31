import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import FenInput from '../components/fen-input.js'

import { getFenSelector } from '../selectors.js'
import { isValidFen } from '../fen.js'
import { newPositionFromFen } from '../actions.js'

class FenForm extends Component {
  constructor (props) {
    super(props)
    this.state = { value: props.fen }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit (event) {
    this.props.onFenSubmit(this.state.value)
    event.preventDefault()
  }

  handleChange (event) {
    let value = event.target.value
    if (value === '') value = this.props.fen

    this.setState({ value: value })
    event.preventDefault()
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevProps.fen !== this.props.fen) {
      this.setState({ value: this.props.fen })
    }
  }

  render () {
    const { value } = this.state
    const isDefault = value === this.props.fen
    const isValid = isValidFen(value)

    return (
      <form onSubmit={this.handleSubmit} style={{ width: '100%' }}>
        <span style={{ float: 'left' }}>Fen: </span>
        <input type='submit' value='Submit' style={{ float: 'right' }} />
        <span style={{ display: 'block', overflow: 'hidden', padding: '0 1em 0 1em' }}>
          <FenInput value={value} onChange={this.handleChange} isDefault={isDefault} isValid={isValid} />
        </span>
      </form>
    )
  }
}

function mapStateToProps (state, ownProps) {
  return {
    fen: getFenSelector(state)
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onFenSubmit: (fen) => {
      return dispatch(newPositionFromFen(fen))
    }
  }
}

FenForm.propTypes = {
  fen: PropTypes.string
}

export default connect(mapStateToProps, mapDispatchToProps)(FenForm)
