import React, { Component } from 'react'

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
  getNewValue = () => {
    fetch(
      'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=USD&date=20180508&json'
    )
      .then(res => res.json())
      .then(json => {
        this.setState({
          rate: json[0].rate
        })
      })
  }

  state = {
    rate: 'Fetching data...',
    getNewValue: this.getNewValue
  }

  render() {
    return (
      <CurrencyContext.Provider value={{ ...this.state }}>
        {this.props.children}
      </CurrencyContext.Provider>
    )
  }
}

export default CurrencyProvider
