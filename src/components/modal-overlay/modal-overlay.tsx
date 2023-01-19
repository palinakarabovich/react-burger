import modalOverlayStyles from './modal-overlay.module.css';

interface IModalOverlayProps {
  onClose: () => void;
}

const ModalOverlay: React.FunctionComponent<IModalOverlayProps> = ({ onClose }) => {
  return (
    <div className={modalOverlayStyles.background} onClick={onClose} />
  )
}

export default ModalOverlay;

