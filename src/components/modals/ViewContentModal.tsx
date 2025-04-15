import React, { useEffect, useState } from 'react';
import styles from '../../styles/viewContentModal.module.scss';
import { FiFileText, FiPlayCircle } from 'react-icons/fi';
import { useAuthContext } from '../../contexts/AuthContext';
import axios from 'axios';

interface ViewContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  recordId?: string;
}

interface Record {
  _id: string;
  title: string;
  description: string;
  link: string;
  category: string;
  type: string;
  duration?: string;
  thumbnail?: string;
}

const ViewContentModal: React.FC<ViewContentModalProps> = ({ isOpen, onClose, recordId }) => {
  const { getToken } = useAuthContext();
  const [record, setRecord] = useState<Record | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecord = async () => {
      if (!recordId) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const token = getToken();
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await axios.get(
          `https://keeping-faith-api.onrender.com/api/v1/records/${recordId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        if (response.data && response.data.record) {
          setRecord(response.data.record);
        } else {
          setError('Record not found');
        }
      } catch (err: any) {
        console.error('Error fetching record:', err);
        setError(err.message || 'Failed to load record');
      } finally {
        setIsLoading(false);
      }
    };

    if (isOpen && recordId) {
      fetchRecord();
    } else {
      setRecord(null);
      setError(null);
    }
  }, [isOpen, recordId, getToken]);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>&times;</button>
        <h2>View Content</h2>
        
        <div className={styles.form}>
          {isLoading ? (
            <div className={styles.loading}>
              <p>Loading record details...</p>
            </div>
          ) : error ? (
            <div className={styles.error}>
              <p>{error}</p>
            </div>
          ) : record ? (
            <>
              <div className={styles.formGroup}>
                <label>Title</label>
                <input type="text" value={record.title} readOnly />
              </div>

              <div className={styles.formGroup}>
                <label>Description</label>
                <textarea value={record.description} readOnly />
              </div>

              <div className={styles.formGroup}>
                <label>URL</label>
                <input type="text" value={record.link} readOnly />
              </div>

              <div className={styles.formGroup}>
                <label>Category</label>
                <input type="text" value={record.category} readOnly />
              </div>

              <label>Preview</label>
              <div className={styles.preview}>
                <div className={styles.previewContent}>
                  <div className={styles.previewImage}>
                    <img 
                      src={record.thumbnail || '/images/searchImage.jpeg'}
                      alt={record.title}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/images/searchImage.jpeg';
                      }}
                    />
                  </div>
                  <div className={styles.previewInfo}>
                    <h3>{record.title}</h3>
                    <div className={styles.meta}>
                      <span><FiFileText className={styles.icon} /> {record.category}</span>
                      {record.duration && (
                        <span><FiPlayCircle className={styles.icon} /> {record.duration}</span>
                      )}
                    </div>
                    <p>{record.description}</p>
                    <a href={record.link} className={styles.visitLink} target="_blank" rel="noopener noreferrer">Visit Link</a>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className={styles.error}>
              <p>No record selected</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewContentModal;
