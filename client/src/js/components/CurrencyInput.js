import React from 'react'
import PropTypes from 'prop-types'

const CurrencyInput = ({ usd, updateUsd }) => {
  const onChange = e => updateUsd(e.target.value)
  return (
    <input
      type="number"
      step="1"
      pattern="[0-9]*"
      name="usd"
      id="usd"
      value={usd}
      onChange={onChange}
    />
  )
}

CurrencyInput.propTypes = {
  usd: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  updateUsd: PropTypes.func
}

export default CurrencyInput
