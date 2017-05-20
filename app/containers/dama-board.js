import { connect } from 'react-redux'

import Board from '../components/board';
import { addPawn } from '../actions';

function mapStateToProps(state) {
  return {
    pieces: state.pieces
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onBlackSquareClick: (sq) => {
      dispatch(addPawn(sq));
    }
  }
}

export const DamaBoard = connect(
  mapStateToProps, 
  mapDispatchToProps
)(Board);

export default DamaBoard;