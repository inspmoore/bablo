import React from 'react'
import styled, { keyframes } from 'styled-components'
import { localized } from '../LocaleProvider'

const blink = keyframes`
  0% {
    background-color: transparent;
  }
  30% {
    background-color: #efefef;
  }
  100% {
    background-color: transparent;
  }
`

const AverageStyled = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #f5f51b;
  font-size: 1.5em;
  font-family: 'Helvetica Neue', 'HelveticaNeue', 'Helvetica', 'Arial',
    sans-serif;
  font-weight: 200;
`
const Label = styled.span`
  color: #b1b1b1;
  font-size: 0.6em !important;
`

const Span = styled.span`
  animation: ${({ animate }) => (animate ? blink : '')} 0.3s ease-in-out;
`

const Average = class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      refresh: false,
      prevAverage: props.average
    }
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.average !== prevState.prevAverage)
      return { prevAverage: nextProps.average, refresh: true }
    return { prevAverage: nextProps.average, refresh: false }
  }

  render() {
    const { average, locale } = this.props
    const { refresh } = this.state
    return (
      <AverageStyled>
        <Span animate={refresh}>{average}₴</Span>
        <Label>{locale.average}</Label>
      </AverageStyled>
    )
  }
}

export default localized(Average)
