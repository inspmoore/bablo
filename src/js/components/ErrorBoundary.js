import React, { Component } from 'react'

class ErrorBoundary extends Component {
  state = { hasNetworError: false }
  componentDidCatch(error, info) {
    this.setState({ hasNetworError: true })
    console.log(error, JSON.stringify(info))
  }

  render() {
    const { children } = this.props
    const { hasNetworError } = this.state
    return hasNetworError ? <p>nie działa sieć</p> : children
  }
}

export default ErrorBoundary
