"use client";

import React, { useState, useEffect } from 'react';
import styles from '../../styles/records.module.scss';
import { LuChevronsUpDown } from 'react-icons/lu';
import ViewContentModal from '../modals/ViewContentModal';
import { useAuthContext } from '../../contexts/AuthContext';
import axios from 'axios';

interface Record {
  _id: string;
  title: string;
  category: string;
  type: string;
  createdAt: string;
}

const Records: React.FC = () => {
  const { getToken } = useAuthContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(null);
  const [records, setRecords] = useState<Record[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchRecords = async () => {
      try {
        const token = getToken();
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await axios.get(
          'https://keeping-faith-api.onrender.com/api/v1/records',
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        if (!isMounted) return;

        if (response.data && Array.isArray(response.data.records)) {
          const transformedRecords = response.data.records.map((record: any) => ({
            _id: record._id,
            title: record.title || 'Untitled',
            category: record.category || 'Default',
            type: record.type || 'Newest',
            createdAt: new Date(record.createdAt).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })
          }));
          setRecords(transformedRecords);
          setError(null);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (err: any) {
        if (isMounted) {
          console.error('Error fetching records:', err);
          setError(err.message || 'Failed to load records');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchRecords();

    return () => {
      isMounted = false;
    };
  }, [getToken]);

  const filteredRecords = records.filter(record =>
    record.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <h1>Records</h1>
      
      <div className={styles.searchContainer}>
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Search name/title"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className={styles.searchButton}>
            Search
          </button>
        </div>
      </div>

      <div className={styles.tableContainer}>
        {loading ? (
          <div>Loading records...</div>
        ) : error ? (
          <div style={{ color: 'red' }}>{error}</div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>
                  <div className={styles.headerCell}>
                    Title <LuChevronsUpDown className={styles.sortIcon} />
                  </div>
                </th>
                <th>
                  <div className={styles.headerCell}>
                    Category <LuChevronsUpDown className={styles.sortIcon} />
                  </div>
                </th>
                <th>
                  <div className={styles.headerCell}>
                    Type <LuChevronsUpDown className={styles.sortIcon} />
                  </div>
                </th>
                <th>
                  <div className={styles.headerCell}>
                    Date Created <LuChevronsUpDown className={styles.sortIcon} />
                  </div>
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((record) => (
                <tr key={record._id}>
                  <td>{record.title}</td>
                  <td>{record.category}</td>
                  <td>{record.type}</td>
                  <td>{record.createdAt}</td>
                  <td>
                    <button 
                      className={styles.viewButton}
                      onClick={() => {
                        setSelectedRecordId(record._id);
                        setIsModalOpen(true);
                      }}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className={styles.pagination}>
        <span>
          Showing 1-{filteredRecords.length} of {filteredRecords.length} total entries
        </span>
        <div className={styles.paginationButtons}>
          <button className={styles.active}>1</button>
          {filteredRecords.length > 10 && <button>next</button>}
        </div>
      </div>

      <ViewContentModal 
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedRecordId(null);
        }}
        recordId={selectedRecordId || undefined}
      />
    </div>
  );
};

export default Records;
