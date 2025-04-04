import { useState } from "react";
import styles from "../../styles/Adduser.module.scss";
import { IoCloseSharp } from "react-icons/io5";

interface AddUserProps {
  onClose: () => void;
}

// const AddUser = () => {
const AddUser: React.FC<AddUserProps> = ({ onClose }) => {
  const [user, setUser] = useState("");
  const [role, setRole] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("User:", user, "Role:", role);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.formname}>
          <h2 className={styles.title}>Add User</h2>
          <span className={styles.closed}>
            <IoCloseSharp className={styles.icon} />
          </span>
        </div>

        <form onSubmit={handleSubmit}>
          {/* ...........First-name Last-name ....... */}
          <div className={styles.nameFields}>
            <div className={styles.inputGroup}>
              <span>First Name</span>
              <input
                type="text"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
              />
            </div>
            <div className={styles.inputGroup}>
              <span>Last Name</span>
              <input
                type="text"
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
              />
            </div>
          </div>

          {/* ..... phone number ....... */}
          <div className={styles.inputGroup}>
            <span>Phone Number</span>
            <input
              type="tel"
              placeholder="Enter your phone number"
              value={formData.phoneNumber}
              onChange={(e) =>
                setFormData({ ...formData, phoneNumber: e.target.value })
              }
            />
          </div>
          {/* ...... Email ... */}
          <div className={styles.inputGroup}>
            <span>Email Address</span>
            <input
              type="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          {/* .... password .... */}
          <div className={styles.inputGroup}>
            <span>Password</span>
            <input
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>
          {/* .... select role .... */}
          <div className={styles.inputGroup}>
            <span>Select Role</span>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className={styles.selectoption}
            >
              <option value="">User</option>
              <option value="admin">Admin</option>
              <option value="editor">Super Admin</option>
            </select>
          </div>

          {/* <label>Select Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className={styles.selectoption}
          >
            <option value="">User</option>
            <option value="admin">Admin</option>
            <option value="editor">Super Admin</option>
          </select> */}
          <span className={styles.btn}>
            <button
              type="submit"
              className={styles.addUserBtn}
              onClick={onClose}
            >
              Add User
            </button>
          </span>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
