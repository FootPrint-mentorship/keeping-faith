import { useState } from "react";
import styles from "../../styles/Adduser.module.scss";
import { IoCloseSharp } from "react-icons/io5";

const AddUser = () => {
  const [user, setUser] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("User:", user, "Role:", role);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.formname}>
          <h2 className={styles.title}>Add User</h2>
          <span>
            <IoCloseSharp className={styles.icon} />
          </span>
        </div>

        <form onSubmit={handleSubmit}>
          <label>Select User</label>
          <select value={user} onChange={(e) => setUser(e.target.value)}>
            <option value="">Select</option>
            <option value="user1">User 1</option>
            <option value="user2">User 2</option>
          </select>

          <label>Select Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className={styles.selectoption}
          >
            <option value="">Select</option>
            <option value="admin">Admin</option>
            <option value="editor">Editor</option>
          </select>
          <span className={styles.btn}>
            <button type="submit" className={styles.addUserBtn}>
              Add User
            </button>
          </span>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
