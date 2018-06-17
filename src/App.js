import React, { Component } from 'react'
import { withCurrency } from './js/CurrencyProvider'
import DateComponent from './js/components/DateComponent'
import Average from './js/components/Average'
import styled from 'styled-components'
import RatesChart from './js/components/RatesChart'
import InputRow from './js/components/InputRow'
import TopBar from './js/components/TopBar'
import Logo from './js/components/Logo'
import { localized } from './js/LocaleProvider'
import LanguageSelector from './js/components/LanguageSelector'
import { isIphone } from './js/tools/isiPhone'
import Snackbar from './js/components/Snackbar'
import A2HSBanner from './js/components/A2HSBanner'
import { messages } from './js/MessageProvider'

const AppStyled = styled.div`
  overflow: hidden;
  padding-top: ${isIphone() ? '91px' : '48px'};
  padding-bottom: 32px;
  background: #212427;
  margin: 0 auto;
  min-height: calc(100% - 88px);
  max-width: 500px;
`

const Header = styled.p`
  font-size: 18px;
  font-family: 'Helvetica Neue', 'HelveticaNeue', 'Helvetica', 'Arial',
    sans-serif;
  color: #efefef;
  text-align: center;
  font-weight: 100;
`

const Footer = Header.extend`
  font-weight: 300;
  font-size: 11px;
  font-family: 'Helvetica Neue', 'HelveticaNeue', 'Helvetica', 'Arial',
    sans-serif;
  color: #efefef;
  & a {
    color: inherit;
    text-decoration: none;
  }
  & a:hover {
    color: #0079ff;
  }
`

class App extends Component {
  componentDidMount() {
    // get currency rates at startup
    this.props.currency.getRates()
  }

  render() {
    const {
      rates,
      average,
      getRates,
      date,
      usd,
      updateUsd,
      updateUah,
      uah,
      loading
    } = this.props.currency
    const { message } = this.props.message

    const { locale } = this.props
    return (
      <AppStyled>
        <TopBar
          left={<Logo color="#fff" />}
          center={
            <DateComponent
              date={date}
              updateDate={getRates}
              loading={loading}
            />
          }
          right={
            <LanguageSelector
              currentLang={locale.lang}
              changeLang={locale.changeLang}
            />
          }
          loading={loading}
        />
        <A2HSBanner
          prompt={locale.installpropmt}
          yes={locale.yesplease}
          no={locale.nothankyou}
        />
        <Average average={average} label={locale.average} />
        <RatesChart rates={rates} average={average} />
        <Header>{locale.calculator}</Header>
        <InputRow value={usd} onChange={updateUsd} label="$" />
        <InputRow
          value={uah}
          onChange={updateUah}
          label="₴"
          step={average - average % 5}
        />
        <Footer>
          <span>Bablo 2018 A.D. - </span>
          <a
            href="https://twitter.com/pirx__"
            target="_blank"
            rel="noopener noreferrer"
          >
            @pirx__
          </a>
        </Footer>
        <Snackbar message={message} locale={locale} />
      </AppStyled>
    )
  }
}

export default messages(localized(withCurrency(App)))
