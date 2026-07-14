import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

import NewGameModal from './new-game-modal'
import { newGame } from '../reducers/actions'

const WelcomeDlg = ({ show }) => {
  const dispatch = useDispatch()

  const handleSubmit = (white, black, fen) => {
    dispatch(newGame(white, black, fen))
  }

  return (
    <NewGameModal show={show} onHide={() => {}} onSubmit={handleSubmit} showCloseButton={false} />
  )
}

WelcomeDlg.propTypes = {
  show: PropTypes.bool,
}

export default WelcomeDlg
