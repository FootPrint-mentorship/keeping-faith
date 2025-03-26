"use client";

import React, { useState } from "react";
import styles from "../../styles/usersidebar.module.scss";
import { FiGrid, FiFileText, FiSettings, FiMenu } from "react-icons/fi";

interface userSidebarProps {
  onSelectPage: (page: string) => void;
}

const navItems = [
  { name: "Home", icon: <FiGrid /> },
  { name: "Records", icon: <FiFileText /> },
  { name: "Settings", icon: <FiSettings /> },
];

const UserSidebar: React.FC<userSidebarProps> = ({ onSelectPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activePage, setActivePage] = useState("Home");

  return (
    <div className={styles.container}>
      <nav className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
        <button className={styles.menuButton} onClick={() => setIsOpen(!isOpen)}>
          <FiMenu />
        </button>
        <ul className={styles.nav}>
          {navItems.map((item) => (
            <li
              key={item.name}
              className={`${styles.navItem} ${activePage === item.name ? styles.active : ""}`}
              onClick={() => {
                setActivePage(item.name);
                onSelectPage(item.name); // Switch page
              }}
            >
              <span className={styles.icon}>{item.icon}</span>
              <span className={`${styles.label} ${isOpen ? styles.show : styles.hide}`}>
                {item.name}
              </span>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default UserSidebar;
