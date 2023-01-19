import modalStyles from './modal.module.css'
import ReactDOM from 'react-dom'
import React from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeIngredient } from '../../services/slices/ingredientDetailsSlice';
import { cleanOrder } from '../../services/slices/orderSlice';

const modalRoot = document.getElementById('root-modal');

const Modal = ({ children, title }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  React.useEffect(() => {
    window.addEventListener('keydown', closeEsc)
    return () => {
      window.removeEventListener('keydown', closeEsc)
    }
  });

  const closeEsc = (e) => {
    if (e.key === 'Escape')
      onClose();
  }

  const onClose = () => {
    history.replace({
      pathname: `/`,
      state: null
    });
    dispatch(removeIngredient());
    dispatch(cleanOrder());
  }

  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClose={onClose} />
      <div className={modalStyles.container}>
        <h2 className={modalStyles.title}>{title}</h2>
        <div className={modalStyles.closeButton} onClick={onClose}><CloseIcon type="primary" /></div>
        {children}
      </div>
    </>, modalRoot)
}

export default Modal;

Modal.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string
}

