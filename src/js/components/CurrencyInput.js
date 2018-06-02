import React from 'react'

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

export default CurrencyInput
