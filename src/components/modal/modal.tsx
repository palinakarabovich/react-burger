import modalStyles from './modal.module.css'
import ReactDOM from 'react-dom'
import React, { ReactNode } from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
<<<<<<< HEAD:src/components/modal/modal.tsx
=======
import PropTypes from 'prop-types';
>>>>>>> main:src/components/modal/modal.jsx
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeIngredient } from '../../services/slices/ingredientDetailsSlice';
import { cleanOrder } from '../../services/slices/orderSlice';
<<<<<<< HEAD:src/components/modal/modal.tsx

interface IModalProps {
  children: ReactNode;
  title: string;
}
=======
>>>>>>> main:src/components/modal/modal.jsx

const modalRoot = document.getElementById('root-modal') as HTMLDivElement;

<<<<<<< HEAD:src/components/modal/modal.tsx
const Modal: React.FunctionComponent<IModalProps> = ({ children, title }) => {
  const history = useHistory();
=======
const Modal = ({ children, title }) => {
  const history = useHistory();
  const dispatch = useDispatch();
>>>>>>> main:src/components/modal/modal.jsx

  React.useEffect(() => {
    window.addEventListener('keydown', closeEsc)
    return () => {
      window.removeEventListener('keydown', closeEsc)
    }
  });

  const closeEsc = (e: KeyboardEvent) => {
    if (e.key === 'Escape')
      onClose();
  }

  const onClose = () => {
<<<<<<< HEAD:src/components/modal/modal.tsx
    history.goBack();
=======
    history.replace({
      pathname: `/`,
      state: null
    });
    dispatch(removeIngredient());
    dispatch(cleanOrder());
>>>>>>> main:src/components/modal/modal.jsx
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

<<<<<<< HEAD:src/components/modal/modal.tsx
=======
Modal.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string
}

>>>>>>> main:src/components/modal/modal.jsx
