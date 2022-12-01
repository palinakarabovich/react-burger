import modalOverlayStyles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

const ModalOverlay = ({ onClose }) => {
  return (
    <div className={modalOverlayStyles.background} onClick={onClose}/>
  )
}

export default ModalOverlay;

ModalOverlay.propTypes = {
  onClose: PropTypes.func
}

