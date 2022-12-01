import modalStyles from './modal.module.css'
import ReactDOM from 'react-dom'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById('root-modal');

const Modal = ({ children, title, onClose }) => {

  return ReactDOM.createPortal(
    <>
      <ModalOverlay />
      <div className={modalStyles.container}>
        <h2 className={modalStyles.title}>{title}</h2>
        <div className={modalStyles.closeButton} onClick={onClose}><CloseIcon type="primary" /></div>
        {children}
      </div>
    </>,
    modalRoot)
}

export default Modal;

Modal.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  onClose: PropTypes.func
}

