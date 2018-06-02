import React from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import 'moment/locale/uk'
import 'moment/locale/pl'
import '../../css/dark_calendar.css'
import { localized } from '../LocaleProvider'

const DateStyled = styled.div`
  background-color: #161719;
  z-index: 1;
`

const DateButton = styled.button`
  border: none;
  background-color: transparent;
  color: #efefef;
  font-size: 17px;
  padding: 0px;
  margin: 0px;
  font-family: 'Helvetica Neue', 'HelveticaNeue', 'Helvetica', 'Arial',
    sans-serif;
  font-weight: 300;
  &:focus {
    outline: none;
    border: none;
    box-shadow: none;
  }
`

const TriangleArrow = ({ width, up }) => (
  <svg viewBox="0 0 8 6" width={width}>
    <g transform={up ? 'rotate(180, 4, 3)' : undefined}>
      <polygon points="0,0 8,0 4,6" fill="#007aff" stroke="none" />
    </g>
  </svg>
)

class CustomInput extends React.Component {
  state = {
    open: false
  }

  handleFocus = e => {
    this.setState({ open: true })
    this.props.onFocus(e)
  }

  handleBlur = e => {
    this.setState({ open: false })
    this.props.onBlur(e)
  }

  handleClick = e => {
    e.preventDefault()
    e.target.focus()
    if (this.state.open) this.props.onClick(e)
  }

  render() {
    const { props } = this

    const { open } = this.state
    return (
      <DateButton
        onFocus={this.handleFocus}
        onClick={this.handleClick}
        onBlur={this.handleBlur}
      >
        {moment(props.value, 'YYYY.MM.DD').format('DD.MM.YYYY')}
        <TriangleArrow width={'8px'} up={open} />
      </DateButton>
    )
  }
}

class DateComponent extends React.Component {
  onChange = date => {
    this.props.updateDate(date)
  }

  render() {
    const { date, locale } = this.props
    moment.locale(locale.lang)
    return (
      <DateStyled>
        <DatePicker
          selected={date}
          onChange={this.onChange}
          maxDate={moment()}
          dateFormat="YYYY.MM.DD"
          todayButton={locale.today}
          customInput={<CustomInput />}
          popperPlacement="auto"
          calendarClassName="dark-calendar"
        />
      </DateStyled>
    )
  }
}

DateComponent.propTypes = {
  updateDate: PropTypes.func.isRequired,
  date: PropTypes.object.isRequired,
  loading: PropTypes.bool
}

export default localized(DateComponent)
