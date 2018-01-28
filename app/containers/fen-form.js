import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getFenSelector } from '../selectors'
import FenInput from '../components/fen-input'

class FenForm extends Component {
  constructor (props) {
    super(props)
    this.state = { value: props.fen }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit (event) {
    console.log('A name was submitted: ' + this.state.value)
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

    return (
      <form onSubmit={this.handleSubmit} style={{ width: '100%' }}>
        <span style={{ float: 'left' }}>Fen: </span>
        <input type='submit' value='Submit' style={{ float: 'right' }} />
        <span style={{ display: 'block', overflow: 'hidden', padding: '0 1em 0 1em' }}>
          <FenInput value={value} onChange={this.handleChange} isDefault={isDefault} />
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

FenForm.propTypes = {
  fen: PropTypes.string
}

export default connect(mapStateToProps)(FenForm)
