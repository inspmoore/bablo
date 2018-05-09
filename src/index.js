import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import CurrencyProvider from './js/CurrencyProvider'

ReactDOM.render(
  <CurrencyProvider>
    <App />
  </CurrencyProvider>,
  document.getElementById('root')
)
registerServiceWorker()
