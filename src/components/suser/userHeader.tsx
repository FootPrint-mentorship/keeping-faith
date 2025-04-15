import React from "react";
import Image from "next/image";
import styles from "../../styles/userheader.module.scss";
import { useAuthContext } from "@/contexts/AuthContext";

interface HeaderProps {
  user: {
    name: string;
    role: string;
    avatarUrl?: string;
  };
}

const UserHeader: React.FC<HeaderProps> = ({ user }) => {
  const { profile } = useAuthContext();

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Chillnlearn Christain</h1>
      <div className={styles.userInfo}>
        <div>
          <span className={styles.userName}>{user.name || profile?.username || "User"}</span>
          <br />
          <span className={styles.userRole}>{user.role || profile?.role || "User"}</span>
        </div>

        <div className={styles.avatar}>
          {(user.avatarUrl || profile?.profile_picture) ? (
            <Image
              src={user.avatarUrl || profile?.profile_picture || ''}
              alt={user.name || profile?.username || "User"}
              width={37}
              height={37}
              className={styles.avatarImage}
            />
          ) : (
            <span className={styles.avatarFallback}>{(user.name || profile?.username || "User").charAt(0)}</span>
          )}
        </div>
      </div>
    </header>
  );
};

export default UserHeader;
