import { connect } from 'react-redux';

import Board from '../components/board';
import { movePiece } from '../actions';
import { appState } from '../app.js';
import { possibleMovesSelector } from '../selectors.js';

function mapDispatchToProps(dispatch) {
  return {
    onPieceMove: (from, to) => {
      const moves = possibleMovesSelector(appState.getState());
        
      for (const move of moves) {
        if (move.squares[0] === from && move.squares[1] === to)
          return dispatch(movePiece(move));;
      }      

      throw new Error('Impossible move selected.');
    }
  }
}

export const DamaBoard = connect(
  null, 
  mapDispatchToProps
)(Board);

export default DamaBoard;