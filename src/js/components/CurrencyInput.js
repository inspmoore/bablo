import React from 'react'

const CurrencyInput = ({ usd, updateUsd }) => {
  const onChange = e => updateUsd(e.target.value)
  return (
    <input type="number" name="usd" id="usd" value={usd} onChange={onChange} />
  )
}

export default CurrencyInput
