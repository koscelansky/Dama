import { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 2rem 1rem;
  text-align: center;
`

const Message = styled.p`
  margin: 0;
  color: #a00;
`

const RetryButton = styled.button`
  padding: 0.4rem 1rem;
  border: 1px solid #a00;
  border-radius: 0.25rem;
  background-color: #fff;
  color: #a00;
  cursor: pointer;
`

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    console.error('Unhandled error caught by ErrorBoundary:', error, info)
  }

  handleReset = () => {
    this.setState({ error: null })
  }

  render() {
    const { error } = this.state

    if (error != null) {
      return (
        <Wrapper role='alert'>
          <Message>Something went wrong.</Message>
          {error.message && <Message>{error.message}</Message>}
          <RetryButton type='button' onClick={this.handleReset}>
            Try again
          </RetryButton>
        </Wrapper>
      )
    }

    return this.props.children
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node,
}

export default ErrorBoundary
