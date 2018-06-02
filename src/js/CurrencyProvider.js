import React, { Component } from 'react'
import { get3Rates } from './nbu/nbuApi'
import moment from 'moment'
import Storage from './tools/storage'
import { createDate } from './tools/time'

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
    const empyRates = [
      { rate: 0, date: createDate('20180526', 2), formatedDate: '' },
      { rate: 0, date: createDate('20180526', 1), formatedDate: '' },
      { rate: 0, date: createDate('20180526'), formatedDate: '' }
    ]

    this.state = {
      rates: o.rates || empyRates,
      average: o.average || 0,
      usd: o.usd || 800,
      uah: o.uah || null,
      date: moment(),
      loading: false,
      message: null
    }
  }

  storeState = () => Storage.storeObject(this.state)

  getRates = (date = this.state.date) => {
    this.setState({ loading: true, message: null })
    const dates = [createDate(date, 2), createDate(date, 1), createDate(date)]
    get3Rates(dates)
      .then(vals => {
        const average = Number(
          vals.reduce((prev, val) => {
            return (prev.rate || prev) + val.rate
          }) / vals.length
        ).toFixed(2)

        this.setState(
          prevState => ({
            rates: vals,
            average,
            uah: Math.round(prevState.usd * average),
            date,
            loading: false
          }),
          this.storeState
        )
      })
      .catch(() => {
        this.setState({ loading: false, message: 'failedtofetch' })
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

  updateUah = uah =>
    this.setState(
      prevState => ({
        usd: Math.round(uah / prevState.average),
        uah
      }),
      this.storeState
    )

  render() {
    return (
      <CurrencyContext.Provider
        value={{
          ...this.state,
          getRates: this.getRates,
          updateUsd: this.updateUsd,
          updateUah: this.updateUah
        }}
      >
        {this.props.children}
      </CurrencyContext.Provider>
    )
  }
}

export default CurrencyProvider
