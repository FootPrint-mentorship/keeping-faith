import { useEffect, useState } from "react";
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
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteUser,
  getAllUsers,
  suspendUser,
  unSuspendUser,
} from "@/api/superadmin.api";
import queryKeys from "@/api/misc/queryKeys";
import { handleApiErrors } from "@/utils/handleErrors";
import { dayJSFormatter } from "@/utils/time";
import RequireAuthLayout from "@/navigation/RequireAuthLayout";
import EmptyTableData from "@/components/common/EmptyTableData";
import AppLoadingSkeleton from "@/components/common/AppLoadingSkeleton";
import DuplicateLoader from "@/components/common/DuplicateLoader";
import { DEFAULT_API_DATA_SIZE } from "@/api/base.api";
import useDebounce from "@/hooks/useDebouncer";
import { useSuperAdminStore } from "@/stores/superAdmin.store";
import ActionPromptModal from "@/components/sadmin/ActionPromptModal";
import { appToast } from "@/utils/appToast";
import { ApiResponse } from "apisauce";
import { GenericApiResponse } from "@/types/api";

export default function UserManagement() {
  const [search, setSearch] = useState("");
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isUpdateUserOpen, setIsUpdateUserOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [isSuspendConfirmOpen, setIsSuspendConfirmOpen] = useState(false);

  const { data, isLoading: isDataLoading } = useQuery({
    queryKey: [queryKeys.USERS.ALL, search],
    queryFn: async () => {
      const response = await getAllUsers({
        limit: DEFAULT_API_DATA_SIZE,
        page: 1,
        searchQuery: search,
      });
      if (response.ok) {
        return response?.data?.data;
      } else {
        handleApiErrors(response);
        return null;
      }
    },
  });

  const handleOnDeleteClick = () => {
    setIsUpdateUserOpen(false);
    setIsDeleteConfirmOpen(true);
  };
  const handleOnSuspendClick = () => {
    setIsUpdateUserOpen(false);
    setIsSuspendConfirmOpen(true);
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

  const debouncedSearch = useDebounce(value, 500);
  const queryClient = useQueryClient();
  useEffect(() => {
    setSearch(debouncedSearch);
  }, [debouncedSearch]);

  const { setSelectedUser, selectedUser } = useSuperAdminStore();

  const handleUserDelete = async () => {
    if (!selectedUser?._id) return appToast.Warning("User Id not found.");
    // setIsUpdateUserOpen(false);
    // setIsLoading(true);
    // setTimeout(() => {
    //   setIsLoading(false);
    //   setSuccessMessage("User deactivated successfully!");
    // }, 2000);

    setIsDeleteConfirmOpen(false);
    setIsLoading(true);
    const response = await deleteUser(selectedUser?._id);
    setIsLoading(false);

    if (response?.ok) {
      const message = response?.data?.message ?? "User deleted succesfully.";
      queryClient.resetQueries({ queryKey: [queryKeys.USERS.ALL] });
      appToast.Success(message);

      // setSuccessMessage(message);
      setSelectedUser(null);
    } else {
      setIsDeleteConfirmOpen(true);
      handleApiErrors(response);
    }
  };

  const handleUserSuspendOrUnsuspend = async () => {
    if (!selectedUser?._id) return appToast.Warning("User Id not found.");
    const isUserActive = !!selectedUser?.isActive; // TODO Replace with selectedUser.status
    // setIsUpdateUserOpen(false);
    // setIsLoading(true);
    // setTimeout(() => {
    //   setIsLoading(false);
    //   setSuccessMessage("User deactivated successfully!");
    // }, 2000);

    setIsSuspendConfirmOpen(false);
    setIsLoading(true);
    let response: ApiResponse<GenericApiResponse, GenericApiResponse> | null =
      null;

    if (isUserActive) response = await suspendUser(selectedUser._id);
    else response = await unSuspendUser(selectedUser?._id);
    setIsLoading(false);

    if (response?.ok) {
      const message =
        response?.data?.message ??
        `User ${isUserActive ? "deactivated" : "activated"} successfully.`;
      queryClient.resetQueries({ queryKey: [queryKeys.USERS.ALL] });
      appToast.Success(message);

      // setSuccessMessage(message);
      setSelectedUser(null);
    } else {
      setIsSuspendConfirmOpen(true);
      handleApiErrors(response);
    }
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
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
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
              {isDataLoading ? (
                <DuplicateLoader
                  loader={
                    <tr>
                      <td className={styles.nameCell}>
                        <div className={styles.nameWrapper}>
                          <IoMdPerson className={styles.person} />

                          <AppLoadingSkeleton />
                        </div>
                      </td>
                      <td>
                        <AppLoadingSkeleton />
                      </td>
                      <td>
                        <AppLoadingSkeleton />
                      </td>
                      <td>
                        <button className={styles.viewButton}>Update</button>
                      </td>
                    </tr>
                  }
                />
              ) : !data || data?.users?.length < 1 ? (
                <div>
                  <EmptyTableData />
                </div>
              ) : (
                data?.users.map((item, index) => (
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
                        onClick={() => {
                          setSelectedUser(item);
                          setIsUpdateUserOpen(true);
                        }}
                      >
                        Update
                      </button>
                      {/* Update User Modal */}

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
                ))
              )}
            </tbody>
          </table>

          <Modal
            isOpen={isUpdateUserOpen}
            onClose={() => setIsUpdateUserOpen(false)}
          >
            <UpdateUser
              onClose={() => setIsUpdateUserOpen(false)}
              onDeactivate={handleOnDeleteClick}
              onUpdate={handleUpdate}
              onSuspendClick={handleOnSuspendClick}
            />
          </Modal>
          <ActionPromptModal
            isOpen={isDeleteConfirmOpen}
            onAccept={handleUserDelete}
            onClose={() => setIsDeleteConfirmOpen(false)}
            title={`You are about deleting user with name ${selectedUser?.first_name}, Are you sure ?`}
          />
          <ActionPromptModal
            isOpen={isSuspendConfirmOpen}
            onAccept={handleUserSuspendOrUnsuspend}
            onClose={() => setIsSuspendConfirmOpen(false)}
            title={`You are about to ${selectedUser?.isActive ? "suspend" : "unsuspend"} user with name ${selectedUser?.first_name}, Are you sure ?`}
          />
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
