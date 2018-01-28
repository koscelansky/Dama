import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class FenInput extends Component {
  render () {
    const { value, onChange, isDefault } = this.props
    const textColor = isDefault ? 'LightGray' : 'Black'

    const style = {
      width: '100%',
      color: textColor
    }

    return (
      <input type='text' value={value} onChange={onChange} style={style} />
    )
  }
}

FenInput.propTypes = {
  isValid: PropTypes.bool.isRequired,
  isDefault: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}
