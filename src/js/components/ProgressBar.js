import React from 'react'
import styled, { keyframes } from 'styled-components'

const anim2 = keyframes`
  0% {
      left: -200%;
      right: 100%;
  }
  60% {
      left: 107%;
      right: -8%;
  }
  100% {
      left: 107%;
      right: -8%;
  }
`
const anim1 = keyframes`
  0% {
    left: -35%;
    right: 100%;
  }
  60% {
    left: 100%;
    right: -90%;
  }
  100% {
    left: 100%;
    right: -90%;
  }
`

const ProgressBarStyled = styled.div`
  background-color: transparent;
  height: 2px;
  position: relative;
  overflow: hidden;
  max-width: 500px;
  margin: 0 auto;
`

const InnerDiv = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  bottom: 0;
  position: absolute;
  transition: transform 0.2s linear;
  transform-origin: left;
`

const DivOne = InnerDiv.extend`
  width: auto;
  animation: ${anim1} 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
  will-change: left, right;
  background-color: #f5f51c;
`
const DivTwo = InnerDiv.extend`
  width: auto;
  animation: ${anim2} 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
  will-change: left, right;
  animation-delay: 1.15s;
  background-color: #0079ff;
`

const ProgressBar = ({ show }) => {
  if (!show) return null
  return (
    <ProgressBarStyled>
      <DivOne />
      <DivTwo />
    </ProgressBarStyled>
  )
}

export default ProgressBar
