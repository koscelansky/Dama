import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useImmer } from 'use-immer'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

import { newGame } from '../actions.js'
import { toFenSelector } from '../selectors.js'
import { isValidFen } from '../fen.js'

const TypeSelect = ({ value, onChange }) => {
  return (
    <Form.Group as={Row} controlId='type-select'>
      <Form.Label column sm='2'>Type</Form.Label>
      <Col sm='10'>
        <Form.Control as='select' custom value={value} onChange={onChange}>
          <option value='human'>Human</option>
          <option value='ai-random'>Random</option>
          <option value='ai-minmax'>MinMax</option>
        </Form.Control>
      </Col>
    </Form.Group>
  )
}

const NameSelect = ({ value, onChange }) => {
  return (
    <Form.Group as={Row}>
      <Form.Label column sm='2'>Name</Form.Label>
      <Col sm='10'>
        <Form.Control type='text' value={value} onChange={onChange} />
      </Col>
    </Form.Group>
  )
}

const TimeSelect = ({ value, onChange }) => {
  return (
    <Form.Group as={Row}>
      <Form.Label column sm='2'>Time</Form.Label>
      <Col sm='10'>
        <Form.Control type='number' min='1' max='300' value={value} onChange={onChange} />
      </Col>
    </Form.Group>
  )
}

const EvaluateSelect = ({ value, onChange }) => {
  return (
    <Form.Group as={Row}>
      <Form.Label column sm='2'>Type</Form.Label>
      <Col sm='10'>
        <Form.Control as='select' value={value} onChange={onChange}>
          <option value='material-count'>Material Count</option>
          <option value='weighted-material-count'>Weighted</option>
        </Form.Control>
      </Col>
    </Form.Group>
  )
}

const NewGameDlg = () => {
  const whiteDef = useSelector(state => state.white)
  const [white, updateWhite] = useImmer(whiteDef)

  const blackDef = useSelector(state => state.black)
  const [black, updateBlack] = useImmer(blackDef)

  const fenDef = useSelector(state => toFenSelector(state))
  const [fen, setFen] = useState(fenDef)

  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(newGame(white, black, fen))
  }

  const isFenValid = isValidFen(fen)

  // https://stackoverflow.com/questions/51256318/issue-of-using-e-target-value-in-react-setstate-function
  // using e.target.value in callbacks is dangerous, because e is a synthetic
  // event, and those are reused for perf reasons, so it will be nullify
  // before the function has a chance to run
  const eventValue = (func) => {
    return e => {
      const value = e.target.value
      func(value)
    }
  }

  const getParams = (data, update) => {
    switch (data.type) {
      case 'human': {
        return (
          <NameSelect
            value={data.name}
            onChange={eventValue(val => { update(draft => { draft.name = val }) })}
          />
        )
      }
      case 'ai-minmax': {
        return (
          <>
            <TimeSelect
              value={data.time}
              onChange={eventValue(val => {
                update(draft => {
                  let value = parseInt(val)
                  value = isNaN(value) ? 10 : value
                  value = Math.min(300, Math.max(value, 1))

                  draft.time = value
                })
              })}
            />
            <EvaluateSelect
              value={data.evaluate}
              onChange={eventValue(val => { update(draft => { draft.evaluate = val }) })}
            />
          </>
        )
      }
      default: {
        return null
      }
    }
  }

  const whiteParams = getParams(white, updateWhite)
  const blackParams = getParams(black, updateBlack)

  return (
    <Form noValidate onSubmit={handleSubmit}>
      <Row>
        <Col>
          <Form.Group>
            <legend>White</legend>
            <TypeSelect
              value={white.type}
              onChange={eventValue(val => { updateWhite(draft => { draft.type = val }) })}
            />
            {whiteParams}
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <legend>Black</legend>
            <TypeSelect
              value={black.type}
              onChange={eventValue(val => { updateBlack(draft => { draft.type = val }) })}
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
            value={fen}
            onChange={eventValue(val => { setFen(val || fenDef) })}
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

export default NewGameDlg
