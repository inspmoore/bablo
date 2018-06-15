import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import CurrencyProvider from './js/CurrencyProvider'
import LocaleProvider from './js/LocaleProvider'
import MessageProvider from './js/MessageProvider'
import ErrorBoundary from './js/components/ErrorBoundary'

ReactDOM.render(
  <ErrorBoundary>
    <MessageProvider>
      <CurrencyProvider>
        <LocaleProvider>
          <App />
        </LocaleProvider>
      </CurrencyProvider>
    </MessageProvider>
  </ErrorBoundary>,
  document.getElementById('root')
)
registerServiceWorker()
