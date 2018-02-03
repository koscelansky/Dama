import { connect } from 'react-redux'

import Board from '../components/board'
import { movePiece } from '../actions'
import { possibleMovesSelector } from '../selectors'

function mapDispatchToProps (dispatch) {
  return {
    onPieceMove: (move) => {
      return dispatch(movePiece(move))
    }
  }
}

function mapStateToProps (state, ownProps) {
  return {
    moves: possibleMovesSelector(state)
  }
}

export const DamaBoard = connect(
  mapStateToProps,
  mapDispatchToProps
)(Board)

export default DamaBoard
