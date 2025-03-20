import React, { ReactNode, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/superadmin.module.scss";
import {
  FiGrid,
  FiFileText,
  FiUsers,
  FiSettings,
  FiMenu,
} from "react-icons/fi";
import SuperAdminHeader from "@/components/sadmin/superAdminHeader";
import SuperAdminDashboard from "@/components/sadmin/superAdminDashboard";

interface SuperAdminProps {
  children?: ReactNode;
}

const navItems = [
  { name: "Dashboard", path: "/dashboard", icon: <FiGrid /> },
  { name: "Records", path: "/records", icon: <FiFileText /> },
  { name: "User Management", path: "/users", icon: <FiUsers /> },
  { name: "Settings", path: "/settings", icon: <FiSettings /> },
];

const SuperAdmin: React.FC<SuperAdminProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <div>
      <SuperAdminHeader
        title={"Keeping Faith"}
        user={{
          name: "Stella Eneh",
          role: "User",
          avatarUrl: undefined,
        }}
      />
      <div className={styles.container}>
        <button
          className={styles.menuButton}
          onClick={() => setIsOpen(!isOpen)}
        >
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
                className={`${styles.navItem} ${router.pathname === item.path ? styles.active : ""}`}
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
        <main className={styles.content}>
          {router.pathname === "/dashboard" ? (
            <SuperAdminDashboard />
          ) : (
            children
          )}
        </main>
        <SuperAdminDashboard />
      </div>
    </div>
  );
};

export default SuperAdmin;
