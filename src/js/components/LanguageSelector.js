import React from 'react'
import { localized } from '../LocaleProvider'
import Button from './Button'

const LanguageSelector = ({ locale }) => {
  return (
    <Button label={locale.lang.toUpperCase()} onClick={locale.changeLang} />
  )
}

export default localized(LanguageSelector)
