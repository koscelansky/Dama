import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

import Pawn from '../svg/pawn'

const PlayerFlexBox = styled.div`
  display: flex;
  flex-direction: ${props => (props.right ? 'row-reverse' : 'row')};
  align-items: center;
  text-align: ${props => (props.right ? 'right' : 'left')};
`

const PlayerName = styled.div`
  font-size: calc(1rem + 3vmin);
`

const PlayerIcon = styled.div`
  flex-basis: 25%;
`

const PlayerLabel = ({ color, right, children }) => {
  return (
    <PlayerFlexBox right={right}>
      <PlayerIcon>
        <Pawn black={color === 'black'} />
      </PlayerIcon>
      <PlayerName right={right}>
        {children}
      </PlayerName>
    </PlayerFlexBox>
  )
}

export default PlayerLabel

PlayerLabel.propTypes = {
  color: PropTypes.oneOf(['white', 'black']),
  right: PropTypes.bool // true if color square should be on right
}
