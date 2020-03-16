import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

import Pawn from './pawn'

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

const PlayerLabel = (props) => {
  return (
    <PlayerFlexBox right={props.right}>
      <PlayerIcon>
        <Pawn black={props.color === 'black'} />
      </PlayerIcon>
      <PlayerName right={props.right}>
        {props.children}
      </PlayerName>
    </PlayerFlexBox>
  )
}

export default PlayerLabel

PlayerLabel.propTypes = {
  color: PropTypes.oneOf(['white', 'black']),
  right: PropTypes.bool // true if color square should be on right
}
