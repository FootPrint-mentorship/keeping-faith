import { useState } from "react";
import styles from "@/styles/usermanagement.module.scss";
import { TbCaretUpDownFilled } from "react-icons/tb";
import { IoSearch } from "react-icons/io5";
import { CiFilter } from "react-icons/ci";
import { IoMdPerson } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import Modal from "@/components/common/Modal";
import AddUser from "@/components/sadmin/Adduser";
import SuccessCard from "@/components/sadmin/Successcard";
import UpdateUser from "@/components/sadmin/Updateuser";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "@/api/superadmin.api";
import queryKeys from "@/api/misc/queryKeys";
import { handleApiErrors } from "@/utils/handleErrors";
import { dayJSFormatter } from "@/utils/time";
import RequireAuthLayout from "@/navigation/RequireAuthLayout";

export default function UserManagement() {
  const [search, setSearch] = useState("");
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isUpdateUserOpen, setIsUpdateUserOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const { data } = useQuery({
    queryKey: [queryKeys.USERS.ALL],
    queryFn: async () => {
      const response = await getAllUsers();
      if (response.ok) {
        return response?.data?.data;
      } else {
        handleApiErrors(response);
        return null;
      }
    },
  });

  const handleDeactivate = () => {
    setIsUpdateUserOpen(false);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage("User deactivated successfully!");
    }, 2000);
  };

  const handleUpdate = () => {
    setIsUpdateUserOpen(false);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage("Update successful!");
    }, 2000);
  };

  const handleUploadSuccess = () => {
    setIsAddUserOpen(false);
    setIsSuccessOpen(true);
  };

  return (
    <RequireAuthLayout role="superadmin">
      <div className={styles.main}>
        <h2 className={styles.title}>User Management</h2>
        <div className={styles.container}>
          <div className={styles.header}>
            <div>
              <div className={styles.searchContainer}>
                <IoSearch className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="Search name/title"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className={styles.search}
                />
                <button className={styles.searchButton}>Search</button>
              </div>
            </div>

            <button
              className={styles.updateButton}
              onClick={() => setIsAddUserOpen(true)}
            >
              <span className={styles.plus}>
                <FaPlus /> &nbsp;
              </span>
              Add New User
            </button>
            {/* Modal................. */}
            <Modal
              isOpen={isAddUserOpen}
              onClose={() => setIsAddUserOpen(false)}
            >
              <AddUser onClose={handleUploadSuccess} />
            </Modal>

            {/*  Success Modal */}
            <Modal
              isOpen={isSuccessOpen}
              onClose={() => setIsSuccessOpen(false)}
            >
              <SuccessCard
                message="User added successfully!"
                onClose={() => setIsSuccessOpen(false)}
              />
            </Modal>
          </div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className="headerCell">
                  <span>User Name</span> <TbCaretUpDownFilled />
                </th>

                <th className="headerCell">
                  <span>User Role</span> <TbCaretUpDownFilled /> <CiFilter />
                </th>

                <th className="headerCell">
                  <span>Date Added</span> <TbCaretUpDownFilled /> <CiFilter />
                </th>

                <th className="headerCell">
                  <span>Action</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.users.map((item, index) => (
                <tr key={index}>
                  <td className={styles.nameCell}>
                    <div className={styles.nameWrapper}>
                      <IoMdPerson className={styles.person} />
                      <span>
                        {item.first_name} {item?.last_name}
                      </span>
                    </div>
                  </td>
                  <td>{item.role}</td>
                  <td>
                    {dayJSFormatter(item.createdAt, "DD-MMM-YYYY, h:mma")}
                  </td>
                  <td>
                    <button
                      className={styles.viewButton}
                      onClick={() => setIsUpdateUserOpen(true)}
                    >
                      Update
                    </button>
                    {/* Update User Modal */}
                    <Modal
                      isOpen={isUpdateUserOpen}
                      onClose={() => setIsUpdateUserOpen(false)}
                    >
                      <UpdateUser
                        onClose={() => setIsUpdateUserOpen(false)}
                        onDeactivate={handleDeactivate}
                        onUpdate={handleUpdate}
                      />
                    </Modal>
                    {/* Loader Modal */}
                    <Modal
                      isOpen={isLoading}
                      onClose={() => setIsLoading(false)}
                    >
                      <div className={styles.loaderContainer}>
                        <div className={styles.loader}></div>
                        <p>Processing...</p>
                      </div>
                    </Modal>

                    {/* Success Modal (Only appears after update modal closes) */}
                    {successMessage && (
                      <Modal
                        isOpen={!!successMessage}
                        onClose={() => setSuccessMessage("")}
                      >
                        <SuccessCard
                          message={successMessage}
                          onClose={() => setSuccessMessage("")}
                        />
                      </Modal>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={styles.paginationWrapper}>
            <span className={styles.paginationText}>
              Showing 1-5 of 30 total entries
            </span>
            <div className={styles.pagination}>
              <button className={`${styles.pageButton} ${styles.active}`}>
                1
              </button>
              <button className={styles.pageButton}>2</button>
              <button className={styles.pageButton} disabled>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </RequireAuthLayout>
  );
}
