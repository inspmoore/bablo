import React from 'react'
import { localized } from '../LocaleProvider'
import styled from 'styled-components'

const LanguageSelectorStyled = styled.button`
  transition: all 0.4s ease-in;
  background-color: transparent;
  color: #8e8f8f;
  padding: 8px;
  margin: 0px;
  font-family: 'Helvetica Neue', 'HelveticaNeue', 'Helvetica', 'Arial',
    sans-serif;
  border: 1px #8e8f8f solid;
  border-radius: 8px;
  min-width: 35px;
  &:focus {
    outline: none;
    box-shadow: none;
  }
  &:active {
    transition: all 0.2s cubic-bezier(0.22, 0.61, 0.36, 1);
    background-color: #efefef;
  }
`

const LanguageSelector = ({ locale }) => {
  return (
    <LanguageSelectorStyled onClick={locale.changeLang}>
      {locale.lang.toUpperCase()}
    </LanguageSelectorStyled>
  )
}

export default localized(LanguageSelector)
