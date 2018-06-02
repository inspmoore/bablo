import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import CurrencyProvider from './js/CurrencyProvider'
import LocaleProvider from './js/LocaleProvider'

ReactDOM.render(
  <CurrencyProvider>
    <LocaleProvider>
      <App />
    </LocaleProvider>
  </CurrencyProvider>,
  document.getElementById('root')
)
registerServiceWorker()
