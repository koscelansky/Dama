import { connect } from 'react-redux'

import Board from '../components/board';

const mapStateToProps = (state, ownProps) => {
  return {
    pieces: state.pieces
  }
}

export const DamaBoard = connect(
  mapStateToProps
)(Board);

export default DamaBoard;