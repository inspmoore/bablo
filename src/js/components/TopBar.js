import React from 'react'
import styled from 'styled-components'
import ProgressBar from './ProgressBar'
import { isIphone } from '../tools/isiPhone'
import PropTypes from 'prop-types'

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
/* @desc Just a top bar with container for stuff
    Props:
    left, center, right [element] - elements to be shown in the top bar
    loading [bool] - a prop showing if the rates are loading.
 */
const TopBar = ({ left, center, right, loading }) => {
  return (
    <Wrapper>
      <Bar>
        <Container align="left">{left}</Container>
        <Container>{center}</Container>
        <Container align="right">{right}</Container>
      </Bar>
      {/* show the progres bar if the rates are being fetched from the server */}
      <ProgressBar show={loading} />
    </Wrapper>
  )
}

TopBar.propTypes = {
  left: PropTypes.element,
  center: PropTypes.element,
  right: PropTypes.element,
  loading: PropTypes.bool
}

export default TopBar
