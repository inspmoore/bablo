import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components'
import { localized } from '../LocaleProvider'

const showhide = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.85);
  }
  
  7% {
    opacity: 1;
    transform: scale(1);
  }
  
  93% {
    opacity: 1;
    transform: scale(1);
  }
  
  100% {
    opacity: 0;
    transform: scale(0.85);
  }
`

const SnackbarStyled = styled.div`
  color: white;
  max-width: 344px;
  background-color: #161719;
  border-radius: 8px;
  padding: 16px;
  position: fixed;
  bottom: 40px;
  margin: 0 16px;
  font-family: 'Helvetica Neue', 'HelveticaNeue', 'Helvetica', 'Arial',
    sans-serif;
  text-align: left;
  animation: ${showhide} 4.6s linear;
  opacity: 0;
  @media (max-width: 500px) {
    right: 0px;
    left: 0px;
  }
`

class Snackbar extends Component {
  state = {
    messageStack: []
  }
  timer = null

  static getDerivedStateFromProps(props, state) {
    if (
      props.message !== state.messageStack[0] &&
      props.message !== null &&
      props.message !== undefined &&
      props.message !== ''
    ) {
      const newStack = [...state.messageStack]
      newStack.push(props.message)
      return { messageStack: newStack }
    }
    return state
  }

  setShowToFalse = () => {
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.setState(prevState => {
        const newStack = [...prevState.messageStack]
        newStack.shift()
        return {
          messageStack: newStack
        }
      })
    }, 4600)
  }

  render() {
    const { locale } = this.props
    const { messageStack } = this.state
    if (messageStack[0]) {
      this.setShowToFalse()
      return (
        <SnackbarStyled>
          {locale[messageStack[0]] || locale.somethingswrong}
        </SnackbarStyled>
      )
    } else {
      return null
    }
  }
}

Snackbar.propTypes = {
  message: PropTypes.string
}

export default localized(Snackbar)
