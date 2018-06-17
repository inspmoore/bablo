import React from 'react'
import styled, { keyframes } from 'styled-components'
import PropTypes from 'prop-types'

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
  padding-top: 8px;
`
const Label = styled.span`
  color: #b1b1b1;
  font-size: 0.6em !important;
`

const Value = styled.span`
  animation: ${({ animate }) => (animate ? blink : '')} 0.3s ease-in-out;
`
/* 
  @desc Component showing an average of the quarterly rates
  Props:
  average [number] - average to be displayed
*/
const Average = class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      refresh: false,
      prevAverage: props.average
    }
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    // if a new value is fed to the comp., the Value elem. fires up the blink animation
    if (nextProps.average !== prevState.prevAverage)
      return { prevAverage: nextProps.average, refresh: true }
    return { prevAverage: nextProps.average, refresh: false }
  }

  render() {
    const { average, label } = this.props
    const { refresh } = this.state
    return (
      <AverageStyled>
        <Value animate={refresh}>{average}₴</Value>
        <Label>{label}</Label>
      </AverageStyled>
    )
  }
}

Average.propTypes = {
  average: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  label: PropTypes.string
}

export default Average
