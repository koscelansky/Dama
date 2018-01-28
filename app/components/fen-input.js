import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class FenInput extends Component {
  render () {
    const { value, onChange } = this.props

    const style = {
      width: '100%'
    }

    return (
      <input type='text' value={value} onChange={onChange} style={style} />
    )
  }
}

FenInput.propTypes = {
  isValid: PropTypes.bool,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}
