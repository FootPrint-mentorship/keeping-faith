import React, { useState } from "react";
import styles from "../../styles/usersidebar.module.scss";
import { FiGrid, FiFileText, FiSettings, FiMenu } from "react-icons/fi";
import { HiOutlineUserGroup } from "react-icons/hi";

interface userSidebarProps {
  onSelectPage: (page: string) => void;
}

const navItems = [
  { name: "Dashboard", icon: <FiGrid /> },
  { name: "Records", icon: <FiFileText /> },
  { name: "User Management", icon: <HiOutlineUserGroup /> },
  { name: "Settings", icon: <FiSettings /> },
];

const SuperAdminSidebar: React.FC<userSidebarProps> = ({ onSelectPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activePage, setActivePage] = useState("Dashboard");

  return (
    <div className={styles.container}>
      <nav
        className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}
      >
        <button
          className={styles.menuButton}
          onClick={() => setIsOpen(!isOpen)}
        >
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
              <span
                className={`${styles.label} ${isOpen ? styles.show : styles.hide}`}
              >
                {item.name}
              </span>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default SuperAdminSidebar;
