import React, { Component } from 'react'
import { withCurrency } from './js/CurrencyProvider'

const CurrencyDisplay = ({ rate }) => {
  return <p>Da rate: {rate}</p>
}

class App extends Component {
  componentDidMount() {
    this.props.context.getNewValue()
  }

  render() {
    const { rate } = this.props.context
    return <CurrencyDisplay rate={rate} />
  }
}

export default withCurrency(App)
