import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components'

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
/* @desc Component showing a message to a user on the bottom of the screen.
    It can store upcoming messages in a stack and show them one at a time.
    Props:
    message [string] - message tag
    locale [object] - object of translations of messages
 */
class Snackbar extends Component {
  state = {
    messageStack: []
  }
  // timer for the message to disappear
  timer = null

  static getDerivedStateFromProps(props, state) {
    if (
      // if the message is not the same as the last one
      props.message !== state.messageStack[0] &&
      // if it's not empty
      props.message !== null &&
      props.message !== undefined &&
      props.message !== ''
    ) {
      const newStack = [...state.messageStack]
      //add the message to the stack
      newStack.push(props.message)
      return { messageStack: newStack }
    }
    return state
  }

  // hides the snackbar ater 4.6 s
  setShowToFalse = () => {
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.setState(prevState => {
        const newStack = [...prevState.messageStack]
        // removes the shown message from the stack
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
  message: PropTypes.string,
  locale: PropTypes.object.isRequired
}

export default Snackbar
