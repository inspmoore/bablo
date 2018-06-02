import React from 'react'
import NumbersRow from './NumbersRow'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Label = styled.label`
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 19px;
  color: #0079ff;
  font-family: inherit;
  font-weight: inherit;
  flex: 1;
`

const Input = styled.input`
  background-color: transparent;
  text-align: right;
  font-size: 19px;
  border: none;
  color: #efefef;
  font-family: inherit;
  font-weight: inherit;

  &:focus {
    outline: none;
    border: none;
    box-shadow: none;
  }
`

const InputRow = class extends React.Component {
  state = {
    focused: false
  }

  handleFocus = e => {
    e.target.select()
    this.setState({ focused: true })
  }

  handleMouseUp = e => {
    e.preventDefault()
  }

  handleBlur = () => this.setState({ focused: false })
  handleChange = e => this.props.onChange(e.target.value)

  render() {
    const { value, label, step } = this.props
    const { handleBlur, handleFocus, handleChange } = this
    const { focused } = this.state

    return (
      <NumbersRow focused={focused}>
        <Label htmlFor="usd" focused={focused}>
          {label}
        </Label>
        <Input
          type="number"
          step={step || 1}
          pattern="[0-9]*"
          name="usd"
          id="usd"
          value={value || ''}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onMouseUp={handleFocus}
          min="0"
        />
      </NumbersRow>
    )
  }
}

InputRow.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  label: PropTypes.string,
  step: PropTypes.number
}

InputRow.defaultProps = {
  step: 1
}

export default InputRow
