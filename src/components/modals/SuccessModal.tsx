import React from 'react';
import styles from '../../styles/successModal.module.scss';
import { FiCheck } from 'react-icons/fi';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>&times;</button>
        <div className={styles.iconContainer}>
          <img src="/images/shield.png" alt="Success" />

        </div>
        <h2>{message}</h2>
      </div>
    </div>
  );
};

export default SuccessModal;
