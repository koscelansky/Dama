import { connect } from 'react-redux';

import Board from '../components/board';
import { movePiece } from '../actions';

function mapStateToProps(state) {
  return {
    pieces: state.pieces
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onPieceMove: (from, to) => {
      dispatch(movePiece(from, to));
    }
  }
}

export const DamaBoard = connect(
  mapStateToProps, 
  mapDispatchToProps
)(Board);

export default DamaBoard;