import React, { Component } from 'react'
import locale from './locale'
import { getLang } from './tools/lang'
import Storage from './tools/storage'

const LocaleContext = React.createContext()
// a decorator to expose the locale object to the Component
export function localized(Component) {
  return function Localized(props) {
    return (
      <LocaleContext.Consumer>
        {locale => <Component {...props} locale={locale} />}
      </LocaleContext.Consumer>
    )
  }
}

/* A Provider to expose the localization to the components
 */

class LocaleProvider extends Component {
  constructor() {
    super()
    // get stored lang preference
    let lang = Storage.get('lang')
    // if stored lang absent, detect the browser lang
    if (!lang) {
      lang = getLang()
      Storage.set('lang', lang)
    }
    this.state = {
      lang
    }
  }
  languages = Object.keys(locale)
  storeLang = () => Storage.set('lang', this.state.lang)

  changeLang = () => {
    let i = this.languages.indexOf(this.state.lang)
    if (i < this.languages.length - 1) i++
    else i = 0
    this.setState({ lang: this.languages[i] }, this.storeLang)
  }

  render() {
    return (
      <LocaleContext.Provider
        value={{
          ...this.state,
          ...locale[this.state.lang],
          changeLang: this.changeLang
        }}
      >
        {this.props.children}
      </LocaleContext.Provider>
    )
  }
}

export default LocaleProvider
