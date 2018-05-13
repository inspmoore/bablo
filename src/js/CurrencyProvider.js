import React, { Component } from 'react'
import { get3Rates } from './nbu/nbuApi'
import moment from 'moment'
import Storage from './tools/storage'

const CurrencyContext = React.createContext()
export const CurrencyConsumer = CurrencyContext.Consumer

export function withCurrency(Component) {
  return function CurrencyComponent(props) {
    return (
      <CurrencyConsumer>
        {context => <Component {...props} context={context} />}
      </CurrencyConsumer>
    )
  }
}

class CurrencyProvider extends Component {
  constructor() {
    super()
    const o = Storage.loadKeys(['average', 'usd', 'uah', 'rates'])

    this.state = {
      rates: o.rates || 'Fetching data...',
      average: o.average || 0,
      usd: o.usd || 800,
      uah: o.uah || null,
      date: moment()
    }
  }

  storeState = () => {
    Storage.storeObject(this.state)
  }

  getRates = (date = this.state.date) => {
    const dates = [
      moment(date)
        .format('YYYYMMDD')
        .toString(),
      moment(date)
        .subtract(1, 'months')
        .format('YYYYMMDD')
        .toString(),
      moment(date)
        .subtract(2, 'months')
        .format('YYYYMMDD')
        .toString()
    ]

    get3Rates(dates).then(vals => {
      const average = Number(
        vals.reduce((prev, val) => {
          return (prev.rate || prev) + val.rate
        }) / vals.length
      ).toFixed(2)

      this.setState(
        {
          rates: vals,
          average,
          uah: this.state.usd * average,
          date
        },
        this.storeState
      )
    })
  }

  updateUsd = usd =>
    this.setState(
      prevState => ({
        usd,
        uah: Math.round(prevState.average * usd)
      }),
      this.storeState
    )

  render() {
    return (
      <CurrencyContext.Provider
        value={{
          ...this.state,
          getRates: this.getRates,
          updateUsd: this.updateUsd
        }}
      >
        {this.props.children}
      </CurrencyContext.Provider>
    )
  }
}

export default CurrencyProvider
