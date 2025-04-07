import React from 'react';
import styles from '../../styles/viewContentModal.module.scss';
import { FiFileText, FiPlayCircle } from 'react-icons/fi';

interface ViewContentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ViewContentModal: React.FC<ViewContentModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <h2>View Content</h2>
        
        <div className={styles.form}>
          <div className={styles.formGroup}>
            <label>Title</label>
            <input type="text" defaultValue="Praise & Worship" />
          </div>

          <div className={styles.formGroup}>
            <label>Description</label>
            <textarea defaultValue="Praise and worship video by odunsi. this features a powerfull prais to the lord." />
          </div>

          <div className={styles.formGroup}>
            <label>Link</label>
            <input type="text" defaultValue="https://youtube/7VFoBqPBjg?si=H/D5rt9_THsLHP5o" />
          </div>

          <div className={styles.formGroup}>
            <label>Category</label>
            <input type="text" defaultValue="Video" />
          </div>

            <label>Preview</label>
          <div className={styles.preview}>
            <div className={styles.previewContent}>
              <div className={styles.previewImage}>
                <img src="/images/searchImage.jpeg" alt="Preview" />
              </div>
              <div className={styles.previewInfo}>
                <h3>Praise & Worship</h3>
                <div className={styles.meta}>
                  <span><FiFileText className={styles.icon} /> Video</span>
                  <span><FiPlayCircle className={styles.icon} /> 1hr 30s</span>
                </div>
                <p>Praise and worship video by odunsi. this features a powerfull praise to the lord.</p>
                <a href="https://youtube/7VFoBqPBjg?si=H/D5rt9_THsLHP5o" className={styles.visitLink}>Visit Link</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewContentModal;
