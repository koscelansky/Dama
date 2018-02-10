import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class Player extends Component {
  render () {
    const text = this.props.type === 'ai' ? 'Computer' : 'Human'

    return (
      <div>
        <span style={{ fontSize: '7vw', transform: 'translateY(-0.2vw)', display: 'inline-block' }}>{ String.fromCharCode(9632) }</span>
        <span style={{ fontSize: '5vw' }}>{ text }</span>
      </div>
    )
  }
}

function mapStateToProps (state, ownProps) {
  return {
    type: state[ownProps.color]
  }
}

function mapDispatchToProps (dispatch) {
  return {
  }
}

Player.propTypes = {
  color: PropTypes.string, // black | white
  type: PropTypes.string // human | ai
}

export default connect(mapStateToProps, mapDispatchToProps)(Player)
