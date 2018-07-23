import React, { Component } from 'react'
import styled from 'styled-components'
import Button from './Button'
import PropTypes from 'prop-types'
import { messages } from '../MessageProvider'

const Wrapper = styled.div`
  overflow: hidden;
`

const Banner = styled.div`
  padding: 10px 8px;
  border-bottom: 1px solid #4c4c4c;
  transition: margin-top 0.3s ease-in-out;
  /* banner is shown/hidden thanks to margin-top */
  margin-top: ${props => props.margin};
`

const Message = styled.div`
  font-family: 'Helvetica Neue', 'HelveticaNeue', 'Helvetica', 'Arial',
    sans-serif;
  font-weight: 100;
  font-size: 14px;
  padding-top: 12px;
`

const ButtonsWraper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 20px;
  /* all the buttons will have a margin-right of 8px, except the last one */
  & button:not(:last-child) {
    margin-right: 8px;
  }
`

/* 
  @desc A banner for displaying a prompt to install the PWA to the device.
  A user can click install, or cancel the prompt.
  Props:
  prompt [string] - message to be displayed
  yes [string] - label for the confirmation button
  no [string] - label fro the cancelation button
 */

class A2HSBanner extends Component {
  constructor() {
    super()
    this.state = {
      bannerHeight: null, //banner height is uknown until the component is mounted
      //show the banner on mount to mesure the height
      visible: true, // determines if the banner will be render in the DOM
      showing: false // determines if the banner is shown
    }
    this.deferredPrompt = null
  }

  componentDidMount() {
    // listen to the event from the SW, that the App is ready to install
    window.addEventListener('beforeinstallprompt', this.handleBeforeInstall)
    // listen to resize event to adjust bannerHeight
    window.addEventListener('resize', this.getBannerHeight)
    // listen to the event from SW, that the app is installed
    window.addEventListener('appinstalled', this.handleAppInstalled)
    // first bannerHeight measurment after the component mount, and setting the banner to be not rendered
    this.setState({ bannerHeight: this.banner.offsetHeight, visible: false })
  }

  componentWillUnmount() {
    // unmount all the listeners
    window.removeEventListener('beforeinstallprompt', this.handleBeforeInstall)
    window.removeEventListener('resize', this.getBannerHeight)
    window.removeEventListener('appinstalled', this.handleAppInstalled)
  }

  handleBeforeInstall = e => {
    // prevent the native banner prompt to pop up
    e.preventDefault()
    // deffering the prompt
    this.deferredPrompt = e
    this.openBanner()
  }

  handleCancel = () => {
    this.closeBanner()
  }

  handleConfirm = () => {
    this.closeBanner()
    if (this.deferredPrompt) {
      // invoking the native browser prompt
      this.deferredPrompt.prompt()
      this.deferredPrompt.userChoice.then(choiceResult => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt')
          this.props.message.sendMessage('appinstalled')
        }
        this.deferredPrompt = null
      })
    }
  }

  handleAppInstalled = e => {
    console.log(e, 'App successfully installed!')
    // sending a message to a Snackbar component, that the app is installed
    this.props.message.sendMessage('appinstalled')
  }

  closeBanner = () => {
    /* closing the banner. first slide up the banner, then after animiation is done
      set visibility to false and stop rendering the banner
     */
    this.setState({ showing: false }, () =>
      setTimeout(() => this.setState({ visible: false }), 300)
    )
  }

  openBanner = () => {
    this.setState({ visible: true }, () => {
      /* a strange workaround. It seems that the browser was not updating 
      the DOM quick enough */
      setTimeout(() => {
        this.setState({ showing: true })
      }, 10)
    })
  }

  getBannerHeight = () => {
    if (this.banner) this.setState({ bannerHeight: this.banner.offsetHeight })
  }

  renderBanner = ({ margin }) => {
    const { prompt, yes, no } = this.props
    return (
      <Wrapper>
        <Banner
          margin={margin}
          innerRef={ref => {
            this.banner = ref
          }}
        >
          <Message>{prompt}</Message>
          <ButtonsWraper>
            <Button label={no} onClick={this.handleCancel} />
            <Button label={yes} onClick={this.handleConfirm} />
          </ButtonsWraper>
        </Banner>
      </Wrapper>
    )
  }

  render() {
    const { bannerHeight, visible, showing } = this.state
    if (visible && showing) return this.renderBanner({ margin: 0 })
    if (visible && !showing)
      return this.renderBanner({
        margin: bannerHeight ? -bannerHeight + 'px' : '-100%'
      })
    return null
  }
}

A2HSBanner.propTypes = {
  prompt: PropTypes.string.isRequired,
  yes: PropTypes.string,
  no: PropTypes.string
}

export default messages(A2HSBanner)
