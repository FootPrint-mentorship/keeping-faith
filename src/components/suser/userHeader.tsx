import React from "react";
import Image from "next/image";
import styles from "../../styles/userheader.module.scss";

interface HeaderProps {
  title: string;
  user: {
    name: string;
    role: string;
    avatarUrl?: string;
  };
}

const userHeader: React.FC<HeaderProps> = ({ title, user }) => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Chillnlearn Christain</h1>
      <div className={styles.userInfo}>
        <div>
          <span className={styles.userName}>{user.name}</span>
          <br />
          <span className={styles.userRole}>{user.role}</span>
        </div>

        <div className={styles.avatar}>
          {user.avatarUrl ? (
            <Image
              src={user.avatarUrl}
              alt={user.name}
              width={37}
              height={37}
              className={styles.avatarImage}
            />
          ) : (
            <span className={styles.avatarFallback}>{user.name.charAt(0)}</span>
          )}
        </div>
      </div>
    </header>
  );
};

export default userHeader;
