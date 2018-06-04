import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import CurrencyProvider from './js/CurrencyProvider'
import LocaleProvider from './js/LocaleProvider'
import ErrorBoundary from './js/components/ErrorBoundary'

ReactDOM.render(
  <ErrorBoundary>
    <CurrencyProvider>
      <LocaleProvider>
        <App />
      </LocaleProvider>
    </CurrencyProvider>
  </ErrorBoundary>,
  document.getElementById('root')
)
registerServiceWorker()
