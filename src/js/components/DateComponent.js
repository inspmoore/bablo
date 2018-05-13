import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import PropTypes from 'prop-types'
import 'moment/locale/uk'
moment.locale('uk')

const DateComponent = ({ updateDate, date }) => {
  return (
    <DatePicker
      selected={date}
      onChange={updateDate}
      maxDate={moment()}
      dateFormat="YYYY MM DD"
      todayButton="Согодні"
    />
  )
}

DateComponent.propTypes = {
  updateDate: PropTypes.func.isRequired,
  date: PropTypes.object.isRequired
}

export default DateComponent
