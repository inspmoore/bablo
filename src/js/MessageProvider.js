import React, { Component } from 'react'

const MessageContext = React.createContext()

export function messages(Component) {
  return function MessageComponent(props) {
    return (
      <MessageContext.Consumer>
        {context => <Component {...props} message={context} />}
      </MessageContext.Consumer>
    )
  }
}

class MessageProvider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: null
    }
  }

  sendMessage = message => {
    this.setState({ message })
  }

  render() {
    return (
      <MessageContext.Provider
        value={{
          ...this.state,
          sendMessage: this.sendMessage
        }}
      >
        {this.props.children}
      </MessageContext.Provider>
    )
  }
}

export default MessageProvider
