import modalStyles from './modal.module.css'
import ReactDOM from 'react-dom'
import React, { ReactNode } from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { useHistory } from 'react-router-dom';

interface IModalProps {
  children: ReactNode;
  title: string;
}

const modalRoot = document.getElementById('root-modal') as HTMLDivElement;

const Modal: React.FunctionComponent<IModalProps> = ({ children, title }) => {
  const history = useHistory();

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
    history.goBack();
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

