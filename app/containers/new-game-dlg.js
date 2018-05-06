import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { newGame } from '../actions.js'
import { toFenSelector } from '../selectors.js'
import { isValidFen } from '../fen.js'

const FenInput = styled.input.attrs({
  type: 'text'
})`
  width: 100%;
  color: ${props => props.isDefault ? 'DarkGray' : 'Black'};
  border-color: ${props => props.isValid ? 'Black' : 'Red'};
`

class NewGameDlg extends Component {
  constructor (props) {
    super(props)
    this.state = {
      whiteName: props.white.name,
      whiteType: props.white.type,
      blackName: props.black.name,
      blackType: props.black.type,
      fen: props.fen
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit (event) {
    const white = {
      name: this.state.whiteName,
      type: this.state.whiteType
    }

    const black = {
      name: this.state.blackName,
      type: this.state.blackType
    }

    this.props.onSubmit(white, black, this.state.fen)
    event.preventDefault()
  }

  handleChange (event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    if (value === '' && name === 'fen') {
      this.setState({
        [name]: this.props[name]
      })
    } else {
      this.setState({
        [name]: value
      })
    }

    event.preventDefault()
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevProps.fen !== this.props.fen) {
      this.setState({ fen: this.props.fen })
    }
  }

  render () {
    const { whiteName, whiteType, blackName, blackType, fen } = this.state

    const isFenDefault = fen === this.props.fen
    const isFenValid = isValidFen(fen)

    return (
      <form onSubmit={this.handleSubmit}>
        <fieldset>
          <legend>White</legend>
          <label>
            Name:
            <input name='whiteName' type='text' value={whiteName} onChange={this.handleChange} />
          </label>
          <label>
            Type:
            <select name='whiteType' value={whiteType} onChange={this.handleChange}>
              <option value='human'>Human</option>
              <option value='ai-random'>Random</option>
              <option value='ai-minmax'>MinMax</option>
            </select>
          </label>
        </fieldset>
        <fieldset>
          <legend>Black</legend>
          <label>
            Name:
            <input name='blackName' type='text' value={blackName} onChange={this.handleChange} />
          </label>
          <label>
            Type:
            <select name='blackType' value={blackType} onChange={this.handleChange}>
              <option value='human'>Human</option>
              <option value='ai-random'>Random</option>
              <option value='ai-minmax'>MinMax</option>
            </select>
          </label>
        </fieldset>
        <fieldset>
          <legend>FEN</legend>
          <FenInput
            name='fen'
            value={fen}
            onChange={this.handleChange}
            isDefault={isFenDefault}
            isValid={isFenValid}
          />
        </fieldset>
        <input type='submit' value='Submit' />
      </form>
    )
  }
}

NewGameDlg.propTypes = {
  white: PropTypes.shape({
    name: PropTypes.string,
    type: PropTypes.string
  }).isRequired,
  black: PropTypes.shape({
    name: PropTypes.string,
    type: PropTypes.string
  }).isRequired,
  fen: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
}

function mapDispatchToProps (dispatch) {
  return {
    onSubmit: (white, black, fen) => {
      return dispatch(newGame(white, black, fen))
    }
  }
}

function mapStateToProps (state, ownProps) {
  return {
    white: state.white,
    black: state.black,
    fen: toFenSelector(state)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewGameDlg)
