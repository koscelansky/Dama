import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fromJS } from 'immutable'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

import { newGame } from '../actions.js'
import { toFenSelector } from '../selectors.js'
import { isValidFen } from '../fen.js'

const TypeSelect = (props) => {
  const { name, value, onChange } = props

  return (
    <Form.Group as={Row} controlId='type-select'>
      <Form.Label column sm='2'>Type</Form.Label>
      <Col sm='10'>
        <Form.Control as='select' custom name={name} value={value} onChange={onChange}>
          <option value='human'>Human</option>
          <option value='ai-random'>Random</option>
          <option value='ai-minmax'>MinMax</option>
        </Form.Control>
      </Col>
    </Form.Group>
  )
}

const NameSelect = (props) => {
  const { name, value, onChange } = props

  return (
    <Form.Group as={Row}>
      <Form.Label column sm='2'>Name</Form.Label>
      <Col sm='10'>
        <Form.Control type='text' name={name} value={value} onChange={onChange} />
      </Col>
    </Form.Group>
  )
}

const TimeSelect = (props) => {
  const { name, value, onChange } = props

  return (
    <Form.Group as={Row}>
      <Form.Label column sm='2'>Time</Form.Label>
      <Col sm='10'>
        <Form.Control type='number' min='1' max='300' name={name} value={value} onChange={onChange} />
      </Col>
    </Form.Group>
  )
}

const EvaluateSelect = (props) => {
  const { name, value, onChange } = props

  return (
    <Form.Group as={Row}>
      <Form.Label column sm='2'>Type</Form.Label>
      <Col sm='10'>
        <Form.Control as='select' name={name} value={value} onChange={onChange}>
          <option value='material-count'>Material Count</option>
          <option value='weighted-material-count'>Weighted</option>
        </Form.Control>
      </Col>
    </Form.Group>
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
          evaluate: props.white.evaluate
        },
        black: {
          name: props.black.name,
          type: props.black.type,
          time: props.black.time,
          evaluate: props.black.evaluate
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
      value = Math.min(300, Math.max(value, 1))
    }

    this.setState(({ data }) => ({
      data: data.setIn(name.split('.'), value)
    }))
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevProps.fen !== this.props.fen) {
      this.setState(({ data }) => ({
        data: data.set('fen', this.props.fen)
      }))
    }
  }

  render () {
    const data = this.state.data

    const fen = data.get('fen')

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
            <>
              <TimeSelect
                name={color + '.time'}
                value={data.getIn([color, 'time'])}
                onChange={this.handleChange}
              />
              <EvaluateSelect
                name={color + '.evaluate'}
                value={data.getIn([color, 'evaluate'])}
                onChange={this.handleChange}
              />
            </>
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
      <Form noValidate onSubmit={this.handleSubmit}>
        <Row>
          <Col>
            <Form.Group>
              <legend>White</legend>
              <TypeSelect
                name='white.type'
                value={data.getIn(['white', 'type'])}
                onChange={this.handleChange}
              />
              {whiteParams}
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <legend>Black</legend>
              <TypeSelect
                name='black.type'
                value={data.getIn(['black', 'type'])}
                onChange={this.handleChange}
              />
              {blackParams}
            </Form.Group>
          </Col>
        </Row>
        <hr />
        <Form.Group as={Row}>
          <Form.Label column sm='1'>FEN</Form.Label>
          <Col sm='11'>
            <Form.Control
              type='text'
              name='fen'
              value={fen}
              onChange={this.handleChange}
              isInvalid={!isFenValid}
              isValid={isFenValid}
            />
          </Col>
        </Form.Group>
        <Row>
          <Col>
            <Form.Group>
              <Button variant='primary' type='submit' size='lg' className='float-right'>
                Start
              </Button>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    )
  }
}

NewGameDlg.propTypes = {
  white: PropTypes.shape({
    name: PropTypes.string,
    type: PropTypes.string,
    evaluate: PropTypes.string,
    time: PropTypes.number
  }).isRequired,
  black: PropTypes.shape({
    name: PropTypes.string,
    type: PropTypes.string,
    evaluate: PropTypes.string,
    time: PropTypes.number
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

function mapStateToProps (state) {
  return {
    white: state.white,
    black: state.black,
    fen: toFenSelector(state)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewGameDlg)
