import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const NumberInputStyled = styled.input`
  background-color: transparent;
  transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-align: right;
  font-size: 19px;
  border: none;
  color: #efefef;

  &:focus {
    outline: none;
    border: none;
    box-shadow: none;
  }
`

const NumberInput = ({ onChange, value, onFocus, onBlur, step = 1 }) => {
  const handleChange = e => onChange(e.target.value)

  return (
    <NumberInputStyled
      type="number"
      step={step}
      pattern="[0-9]*"
      name="usd"
      id="usd"
      value={value}
      onChange={handleChange}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  )
}

NumberInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  step: PropTypes.number
}

export default NumberInput
