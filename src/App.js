import React, { Component } from 'react'
import { withCurrency } from './js/CurrencyProvider'
import moment from 'moment'
import DateComponent from './js/components/DateComponent'
import CurrencyInput from './js/components/CurrencyInput'
import Hrywna from './js/components/Hrywna'
import Average from './js/components/Average'
import Rates from './js/components/Rates'
import 'react-datepicker/dist/react-datepicker.css'

class App extends Component {
  state = {
    date: moment(),
    focused: null
  }
  componentDidMount() {
    this.props.context.getRates()
  }

  render() {
    const {
      rates,
      average,
      getRates,
      date,
      usd,
      updateUsd,
      uah
    } = this.props.context
    return (
      <div>
        <DateComponent date={date} updateDate={getRates} />
        <Rates rates={rates} />
        <Average average={average} />
        <CurrencyInput usd={usd} updateUsd={updateUsd} />
        <Hrywna uah={uah} />
      </div>
    )
  }
}

export default withCurrency(App)
