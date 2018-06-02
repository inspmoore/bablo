import React from 'react'
import styled from 'styled-components'

const NumbersRowStyled = styled.div`
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
  background: ${props => (props.focused ? '#b1b1b1' : 'transparent')};
  padding: 16px;
  border-width: 1px 0px;
  border-style: solid;
  border-color: #4c4c4c;
  margin-bottom: -1px;
  font-weight: 200;
  font-family: 'HelveticaNeue', 'Helvetica Neue', 'Helvetica', 'Arial',
    sans-serif;
`

const NumbersRow = ({ children, focused }) => {
  return <NumbersRowStyled focused={focused}>{children}</NumbersRowStyled>
}

export default NumbersRow
