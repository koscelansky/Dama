import { connect } from 'react-redux'

import Board from '../components/board'
import { movePiece } from '../actions'

function mapDispatchToProps (dispatch) {
  return {
    onPieceMove: (move) => {
      return dispatch(movePiece(move))
    }
  }
}

export const DamaBoard = connect(
  null,
  mapDispatchToProps
)(Board)

export default DamaBoard
