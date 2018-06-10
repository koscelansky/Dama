import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { fromJS } from 'immutable'

import { newGame } from '../actions.js'
import { toFenSelector } from '../selectors.js'
import { isValidFen } from '../fen.js'

const FenInput = styled.input.attrs({
  type: 'text'
})`
  width: 100%;
  color: ${props => props.isDefault ? 'DarkGray' : 'Black'};
  border-color: ${props => props.isValid ? 'Black' : 'Red'};
  border-width: 1px;
`

const Form = styled.form`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(2, 1fr);
`

const Group = styled.fieldset`
  border-radius: 5px;
  border-width: 1px;
  border-color: DarkGray;
  border-style: solid;
`

const FenGroup = Group.extend`
  grid-column-start: 1;
  grid-column-end: span 2;
`

const SubmitGroup = styled.fieldset`
  grid-column-start: 1;
  grid-column-end: span 2;
  justify-self: end;
  border-width: 0;
`

const BlockLabel = styled.label`
  display: flex;
  align-items: baseline;

  input {
    width: 100%;
    min-width: 0;
    flex: 1;
    margin: 5px;
  }

  input[type='checkbox'] {
    width: auto;
    flex: none;
    align-self: center;
  }

  select {
    width: 100%;
    flex: 1;
    margin: 5px;
  }
`

const TypeSelect = (props) => {
  const {name, value, onChange} = props

  return (
    <BlockLabel>
      Type:&nbsp;
      <select name={name} value={value} onChange={onChange}>
        <option value='human'>Human</option>
        <option value='ai-random'>Random</option>
        <option value='ai-minmax'>MinMax</option>
      </select>
    </BlockLabel>
  )
}

const NameSelect = (props) => {
  const {name, value, onChange} = props

  return (
    <BlockLabel>
      Name:&nbsp;
      <input type='text' name={name} value={value} onChange={onChange} />
    </BlockLabel>
  )
}

const TimeSelect = (props) => {
  const {name, value, onChange} = props

  return (
    <BlockLabel>
      Time:&nbsp;
      <input type='number' min='1' max='300' name={name} value={value} onChange={onChange} />
    </BlockLabel>
  )
}

const AlphaBetaSelect = (props) => {
  const {name, value, onChange} = props

  return (
    <BlockLabel>
      Alpha-Beta pruning:&nbsp;
      <input type='checkbox' name={name} defaultChecked={value} onChange={onChange} />
    </BlockLabel>
  )
}

class NewGameDlg extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: fromJS({
        white: {
          name: props.white.name,
          type: props.white.type,
          time: props.white.time,
          alphaBeta: props.white.alphaBeta
        },
        black: {
          name: props.black.name,
          type: props.black.type,
          time: props.black.time,
          alphaBeta: props.black.alphaBeta
        },
        fen: props.fen
      })
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit (event) {
    const data = this.state.data

    this.props.onSubmit(data.get('white').toJS(), data.get('black').toJS(), data.get('fen'))
    event.preventDefault()
  }

  handleChange (event) {
    const target = event.target
    let value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    if (value === '' && name === 'fen') {
      value = this.props.fen
    }

    if (name.endsWith('time')) {
      value = parseInt(value)
      value = isNaN(value) ? 10 : value
      value = Math.clamp(value, 1, 300)
    }

    this.setState(({data}) => ({
      data: data.setIn(name.split('.'), value)
    }))
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevProps.fen !== this.props.fen) {
      this.setState(({data}) => ({
        data: data.set('fen', this.props.fen)
      }))
    }
  }

  render () {
    const data = this.state.data

    const fen = data.get('fen')

    const isFenDefault = fen === this.props.fen
    const isFenValid = isValidFen(fen)

    const getParams = (color) => {
      switch (data.getIn([color, 'type'])) {
        case 'human': {
          return (
            <NameSelect
              name={color + '.name'}
              value={data.getIn([color, 'name'])}
              onChange={this.handleChange}
            />
          )
        }
        case 'ai-minmax': {
          return (
            <React.Fragment>
              <TimeSelect
                name={color + '.time'}
                value={data.getIn([color, 'time'])}
                onChange={this.handleChange}
              />
              <AlphaBetaSelect
                name={color + '.alphaBeta'}
                value={data.getIn([color, 'alphaBeta'])}
                onChange={this.handleChange}
              />
            </React.Fragment>
          )
        }
        default: {
          return null
        }
      }
    }

    const whiteParams = getParams('white')
    const blackParams = getParams('black')

    return (
      <Form onSubmit={this.handleSubmit}>
        <Group>
          <legend>White</legend>
          <TypeSelect
            name='white.type'
            value={data.getIn(['white', 'type'])}
            onChange={this.handleChange}
          />
          { whiteParams }
        </Group>
        <Group>
          <legend>Black</legend>
          <TypeSelect
            name='black.type'
            value={data.getIn(['black', 'type'])}
            onChange={this.handleChange}
          />
          { blackParams }
        </Group>
        <FenGroup>
          <legend>FEN</legend>
          <FenInput
            name='fen'
            value={fen}
            onChange={this.handleChange}
            isDefault={isFenDefault}
            isValid={isFenValid}
          />
        </FenGroup>
        <SubmitGroup>
          <input type='submit' value='OK' />
        </SubmitGroup>
      </Form>
    )
  }
}

NewGameDlg.propTypes = {
  white: PropTypes.shape({
    name: PropTypes.string,
    type: PropTypes.string,
    depth: PropTypes.number,
    alphaBeta: PropTypes.bool
  }).isRequired,
  black: PropTypes.shape({
    name: PropTypes.string,
    type: PropTypes.string,
    depth: PropTypes.number,
    alphaBeta: PropTypes.bool
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
