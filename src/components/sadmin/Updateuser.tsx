import { useState } from "react";
import styles from "../../styles/updateuser.module.scss";
import { IoCloseSharp } from "react-icons/io5";
import { USER_ROLES_LIST } from "@/api/misc/constants.api";
import { useSuperAdminStore } from "@/stores/superAdmin.store";

interface UpdateUserProps {
  onClose: () => void;
  onDeactivate: () => void;
  onUpdate: () => void;
  onSuspendClick: () => void;
}

const UpdateUser: React.FC<UpdateUserProps> = ({
  onClose,
  onDeactivate,
  onUpdate,
  onSuspendClick,
}) => {
  const { selectedUser } = useSuperAdminStore();
  const [role, setRole] = useState("");

  const isLoading = false;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.formname}>
          <h2 className={styles.title}>
            Update User ({selectedUser?.first_name} {selectedUser?.last_name})
          </h2>
          <span>
            <IoCloseSharp className={styles.icon} onClick={onClose} />
          </span>
        </div>

        <form onSubmit={(e) => e.preventDefault()}>
          {/* <label
            style={{
              marginBottom: 50,
              marginTop: -30,
            }}
          ></label> */}
          {/* <label>Select User</label> */}
          {/* <select value={user} onChange={(e) => setUser(e.target.value)}>
            <option value="">Select</option>
            <option value="user1">User 1</option>
            <option value="user2">User 2</option>
          </select> */}

          <label>Select Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target?.value)}
            disabled={isLoading}
            defaultValue={selectedUser?.role}
            className={styles.selectoption}
          >
            {USER_ROLES_LIST?.map(({ title, value }, key) => (
              <option key={key} value={value}>
                {title}
              </option>
            ))}
          </select>
          <span className={styles.btn}>
            <button
              type="button"
              className={styles.deactivateUserBtn}
              onClick={onSuspendClick}
            >
              {!!selectedUser?.isActive ? "Suspend" : "Unsuspend"}
            </button>
            <button
              type="button"
              className={styles.deactivateUserBtn}
              onClick={onDeactivate}
            >
              Delete User
            </button>
            <button
              type="button"
              className={styles.addUserBtn}
              onClick={onUpdate}
            >
              Upgrade / Demote User
            </button>
          </span>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;

// import { useState } from "react";
// import styles from "../../styles/updateuser.module.scss";
// import { IoCloseSharp } from "react-icons/io5";

// interface AddUserProps {
//   onClose: () => void;
// }

// // const AddUser = () => {
// const UpdateUser: React.FC<AddUserProps> = ({ onClose }) => {
//   const [user, setUser] = useState("");
//   const [role, setRole] = useState("");

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log("User:", user, "Role:", role);
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.card}>
//         <div className={styles.formname}>
//           <h2 className={styles.title}>Update User</h2>
//           <span>
//             <IoCloseSharp className={styles.icon} />
//           </span>
//         </div>

//         <form onSubmit={handleSubmit}>
//           <label>Select User</label>
//           <select value={user} onChange={(e) => setUser(e.target.value)}>
//             <option value="">Select</option>
//             <option value="user1">User 1</option>
//             <option value="user2">User 2</option>
//           </select>

//           <label>Select Role</label>
//           <select
//             value={role}
//             onChange={(e) => setRole(e.target.value)}
//             className={styles.selectoption}
//           >
//             <option value="">Reporter</option>
//             <option value="admin">Admin</option>
//             <option value="editor">Editor</option>
//           </select>
//           <span className={styles.btn}>
//             <button
//               type="submit"
//               className={styles.deactivateUserBtn}
//               onClick={onClose}
//             >
//               Deactivate User
//             </button>
//             <button
//               type="submit"
//               className={styles.addUserBtn}
//               onClick={onClose}
//             >
//               Update User
//             </button>
//           </span>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UpdateUser;
