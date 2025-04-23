"use client";

import React, { useState } from 'react';
import UserSidebar from './suser/userSidebar';
import Records from './pages/Records';
import styles from '../styles/layout.module.scss';

const Layout: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('Home');

  const renderPage = () => {
    switch (currentPage) {
      case 'Records':
        return <Records />;
      case 'Home':
        return <div>Home Page</div>;
      case 'Settings':
        return <div>Settings Page</div>;
      default:
        return <div>Home Page</div>;
    }
  };

  return (
    <div className={styles.layout}>
      <UserSidebar onSelectPage={setCurrentPage} />
      <main className={styles.mainContent}>
        {renderPage()}
      </main>
    </div>
  );
};

export default Layout;
