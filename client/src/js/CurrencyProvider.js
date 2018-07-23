import React, { Component } from 'react'
import { get3Rates } from './nbu/nbuApi'
import moment from 'moment'
import Storage from './tools/storage'
import { messages } from './MessageProvider'

const CurrencyContext = React.createContext()
// A class decorator to expose the currency object to the Component
export function withCurrency(Component) {
  return function CurrencyComponent(props) {
    return (
      <CurrencyContext.Consumer>
        {context => <Component {...props} currency={context} />}
      </CurrencyContext.Consumer>
    )
  }
}
/* Provider that delivers data for currency rates, average,
    methods to update the currency values.
 */
class CurrencyProvider extends Component {
  constructor() {
    super()
    // loading the data from the localstorage
    const o = Storage.loadKeys(['average', 'usd', 'uah', 'rates'])
    // empty data for the first lunch. essential for the chart to work normally
    const empyRates = [
      { rate: 0, date: '20180326', formatedDate: '' },
      { rate: 0, date: '20180426', formatedDate: '' },
      { rate: 0, date: '20180526', formatedDate: '' }
    ]

    this.state = {
      rates: o.rates || empyRates,
      average: o.average || 0,
      usd: o.usd || 800,
      uah: o.uah || null,
      date: moment(),
      loading: false
    }
  }

  storeState = () => Storage.storeObject(this.state)

  getRates = (date = this.state.date) => {
    this.setState({ loading: true })
    console.log(moment(date).format('YYYYMMDD'))

    get3Rates(moment(date).format('YYYYMMDD'))
      .then(vals => {
        console.log(vals)

        // arithmetical average of 3 currency rates
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
        this.setState({ loading: false })
        this.props.message.sendMessage('failedtofetch')
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

export default messages(CurrencyProvider)
