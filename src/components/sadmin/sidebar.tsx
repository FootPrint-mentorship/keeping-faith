"use client";

import React, { ReactNode, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Correct import for App Router
import styles from "../../styles/superadminsidebar.module.scss";
import { FiGrid, FiFileText, FiSettings, FiMenu } from "react-icons/fi";
import { MdOutlineGroups2 } from "react-icons/md";

interface SideBarProps {
  children?: ReactNode;
}

const navItems = [
  { name: "Dashboard", path: "/manageRecord", icon: <FiGrid /> },
  { name: "Records", path: "/records", icon: <FiFileText /> },
  { name: "User Management", path: "/users", icon: <MdOutlineGroups2 /> },
  { name: "Settings", path: "/settings", icon: <FiSettings /> },
];

const SideBar: React.FC<SideBarProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); // Correct method for App Router

  return (
    <div className={styles.container}>
      <button className={styles.menuButton} onClick={() => setIsOpen(!isOpen)}>
        <FiMenu />
      </button>
      <nav
        className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}
      >
        <div className={styles.logo}>{isOpen}</div>
        <ul className={styles.nav}>
          {navItems.map((item) => (
            <li
              key={item.name}
              className={`${styles.navItem} ${pathname === item.path ? styles.active : ""}`}
            >
              <Link href={item.path}>
                <span className={styles.icon}>{item.icon}</span>
                <span
                  className={`${styles.label} ${isOpen ? styles.show : styles.hide}`}
                >
                  {item.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;
