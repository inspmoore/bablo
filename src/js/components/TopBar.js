import React from 'react'
import styled from 'styled-components'
import ProgressBar from './ProgressBar'
import { isIphone } from '../tools/isiPhone'

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #161719;
  z-index: 1;
`

const Bar = styled.div`
  display: flex;
  height: 48px;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin: 0 auto;
  ${isIphone() ? 'margin-top: 35px;' : ''} max-width: 500px;
  padding: 0px 19px;
  box-sizing: border-box;
`

const Container = styled.div`
  flex: 1;
  text-align: ${({ align = 'center' }) => align};
`

const TopBar = ({ left, center, right, loading }) => {
  return (
    <Wrapper>
      <Bar>
        <Container align="left">{left}</Container>
        <Container>{center}</Container>
        <Container align="right">{right}</Container>
      </Bar>
      <ProgressBar show={loading} />
    </Wrapper>
  )
}

export default TopBar
