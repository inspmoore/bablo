import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const ButtonStyled = styled.button`
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

const Button = ({ label, onClick }) => {
  return (
    // onTouchStart={() => {}} - mobile safari workaround for the :active state
    <ButtonStyled onTouchStart={() => {}} onClick={onClick}>
      {label}
    </ButtonStyled>
  )
}

Button.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func
}

export default Button
