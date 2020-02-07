import React from 'react'
import { Icon } from '@iconify/react'
import xIcon from '@iconify/icons-cil/x'
import styled from 'styled-components'

const HoverWrapper = styled.div`
  &:hover {
    path {
      fill: darkred;
    }
    cursor: pointer;
  }
`

const CloseIcon = (props) => {
  return (
    <HoverWrapper>
      <Icon width='100%' icon={xIcon} style={{ display: 'block' }} />
    </HoverWrapper>
  )
}

export default CloseIcon
