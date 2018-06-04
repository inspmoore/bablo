import React, { Component } from 'react'
import styled from 'styled-components'

const ErrorScreen = styled.div`
  height: 100%;
  background: #2d2d2d;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #e2e2e2;
  font-size: 18px;
  font-family: 'Helvetica Neue', 'HelveticaNeue', 'Helvetica', 'Arial',
    sans-serif;
`

class ErrorBoundary extends Component {
  state = { hasNetworError: false }
  componentDidCatch(error, info) {
    this.setState({ hasNetworError: true })
    console.log(error, JSON.stringify(info))
  }

  render() {
    const { children } = this.props
    const { hasNetworError } = this.state
    return hasNetworError ? (
      <ErrorScreen>
        I'm sorry but the app has crashed. Please consider restatring it. Have a
        nice day :)
      </ErrorScreen>
    ) : (
      children
    )
  }
}

export default ErrorBoundary
