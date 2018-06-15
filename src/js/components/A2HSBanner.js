import React, { Component } from 'react'
import styled from 'styled-components'
import Button from './Button'
import PropTypes from 'prop-types'

const Wrapper = styled.div`
  overflow: hidden;
`

const Banner = styled.div`
  padding: 10px 8px;
  border-bottom: 1px solid #4c4c4c;
  transition: margin-top 0.3s ease-in-out;
  margin-top: ${props => {
    console.log(props.margin)
    return props.margin
  }};
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
  & button:not(:last-child) {
    margin-right: 8px;
  }
`

class A2HSBanner extends Component {
  constructor() {
    super()
    this.state = {
      bannerHeight: null,
      //show the banner on mount to mesure the height
      visible: true,
      showing: false
    }
    this.deferredPrompt = null
  }

  componentDidMount() {
    window.addEventListener('beforeinstallprompt', this.handleBeforeInstall)
    window.addEventListener('resize', this.getBannerHeight)
    window.addEventListener('appinstalled', this.handleAppInstalled)
    this.setState({ bannerHeight: this.banner.offsetHeight, visible: false })
  }

  componentWillUnmount() {
    window.removeEventListener('beforeinstallprompt', this.handleBeforeInstall)
    window.removeEventListener('resize', this.getBannerHeight)
    window.removeEventListener('appinstalled', this.handleAppInstalled)
  }

  handleBeforeInstall = e => {
    e.preventDefault()
    this.deferredPrompt = e
    this.openBanner()
  }

  handleCancel = () => {
    this.closeBanner()
  }

  handleConfirm = () => {
    this.closeBanner()
    if (this.deferredPrompt) {
      this.deferredPrompt.prompt()
      this.deferredPrompt.userChoice.then(choiceResult => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt')
        }
        this.deferredPrompt = null
      })
    }
  }

  handleAppInstalled = e => {
    console.log(e, 'App successfully installed!')
  }

  closeBanner = () => {
    this.setState({ showing: false }, () =>
      setTimeout(() => this.setState({ visible: false }), 300)
    )
  }

  openBanner = () => {
    this.setState({ visible: true }, () => {
      // a strange workaround. It seems that the browser was not updating the DOM quick enough
      setTimeout(() => {
        this.setState({ showing: true })
      }, 10)
    })
  }

  getBannerHeight = () => {
    if (this.banner) this.setState({ bannerHeight: this.banner.offsetHeight })
  }

  renderBanner = ({ margin }) => {
    const { message, yes, no } = this.props
    return (
      <Wrapper>
        <Banner
          margin={margin}
          innerRef={ref => {
            this.banner = ref
          }}
        >
          <Message>{message}</Message>
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
    console.log(
      `bannerHeight: ${bannerHeight}, visible: ${visible}, showing: ${showing}`
    )

    if (visible && showing) return this.renderBanner({ margin: 0 })
    if (visible && !showing)
      return this.renderBanner({
        margin: bannerHeight ? -bannerHeight + 'px' : '-100%'
      })
    return null
  }
}

A2HSBanner.propTypes = {
  message: PropTypes.string.isRequired,
  yes: PropTypes.string,
  no: PropTypes.string
}

export default A2HSBanner
