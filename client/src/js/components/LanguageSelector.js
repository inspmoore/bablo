import React from 'react'
import Button from './Button'
import PropTypes from 'prop-types'

const LanguageSelector = ({ changeLang, currentLang }) => {
  return <Button label={currentLang.toUpperCase()} onClick={changeLang} />
}

LanguageSelector.propTypes = {
  changeLang: PropTypes.func,
  currentLang: PropTypes.string.isRequired
}

export default LanguageSelector
