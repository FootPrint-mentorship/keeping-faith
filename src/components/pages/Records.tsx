"use client";

import React, { useState } from 'react';
import styles from '../../styles/records.module.scss';
import { LuChevronsUpDown } from 'react-icons/lu';
import ViewContentModal from '../modals/ViewContentModal';

interface Record {
  name: string;
  category: string;
  type: string;
  dateCreated: string;
}

const Records: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [records] = useState<Record[]>([
    { name: 'Praise & Worship', category: 'Videos', type: 'Newest', dateCreated: '21-Oct-2023, 10:04am' },
    { name: 'Praise & Worship', category: 'Audio', type: 'Most Viewed', dateCreated: '21-Oct-2023, 10:04am' },
    { name: 'Praise & Worship', category: 'Book', type: 'Newest', dateCreated: '21-Oct-2023, 10:04am' },
    { name: 'Praise & Worship', category: 'Video', type: 'Newest', dateCreated: '21-Oct-2023, 10:04am' },
    { name: 'Praise & Worship', category: 'Video', type: 'Newest', dateCreated: '21-Oct-2023, 10:04am' },
  ]);

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
        <table className={styles.table}>
          <thead>
            <tr>
              <th>
                <div className={styles.headerCell}>
                  Name/title <LuChevronsUpDown className={styles.sortIcon} />
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
              <th>
                <div className={styles.headerCell}>
                  Action <LuChevronsUpDown className={styles.sortIcon} />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {records.map((record, index) => (
              <tr key={index}>
                <td>{record.name}</td>
                <td>{record.category}</td>
                <td>{record.type}</td>
                <td>{record.dateCreated}</td>
                <td>
                  <button 
                    className={styles.viewButton}
                    onClick={() => setIsModalOpen(true)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.pagination}>
        <span>Showing 1-10 of 20 total entries</span>
        <div className={styles.paginationButtons}>
          <button className={styles.active}>1</button>
          <button>2</button>
          <button>next</button>
        </div>
      </div>

      <ViewContentModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Records;
