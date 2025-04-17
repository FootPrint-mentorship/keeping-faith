import queryKeys from "@/api/misc/queryKeys";
import { GetRecords, PostRecord } from "@/api/records.api";
import Modal from "@/components/common/Modal";
import SuccessCard from "@/components/sadmin/Successcard";
import UpdateForm from "@/components/sadmin/Updateform";
import UploadForm, { UploadFormData } from "@/components/sadmin/uploadForm";
import { appToast } from "@/utils/appToast";
import { handleApiErrors } from "@/utils/handleErrors";
import { dayJSFormatter } from "@/utils/time";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { CiFilter } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import { GrStatusGoodSmall } from "react-icons/gr";
import { TbCaretUpDownFilled } from "react-icons/tb";
import styles from "../../styles/recordManagement.module.scss";
import AppLoadingSkeleton from "../common/AppLoadingSkeleton";
import AppSearchInput from "../common/AppSearchInput";
import DuplicateLoader from "../common/DuplicateLoader";
import EmptyTableData from "../common/EmptyTableData";

export default function ManageRecord() {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const PostRecordApi = useMutation({ mutationFn: PostRecord });
  const queryClient = useQueryClient();

  const handleDelete = () => {
    setIsUpdateOpen(false);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage("Record deleted successfully!");
    }, 1500);
  };

  const handleUpdate = () => {
    setIsUpdateOpen(false);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage("Update successful!");
    }, 1500);
  };

  const handleUpload = async (data: UploadFormData) => {
    setIsLoading(true);
    const response = await PostRecordApi?.mutateAsync({
      category: data?.category?.trim(),
      description: data?.description?.trim(),
      link: data?.link?.trim(),
      subCategory: data?.subCategory?.trim(),
      title: data?.title?.trim(),
    });
    setIsLoading(false);

    if (response?.ok) {
      setIsModalOpen(false);
      appToast.Success("Upload successful!");
      queryClient.invalidateQueries({ queryKey: [queryKeys.GET_RECORDS] });
    } else {
      handleApiErrors(response);
    }
  };

  const { data, isLoading: isDataLoading } = useQuery({
    queryKey: [queryKeys.GET_RECORDS, search],
    queryFn: async () => {
      const response = await GetRecords({
        category: "",
        subCategory: "",
        search,
      });
      if (response.ok) {
        return response?.data?.records;
      } else {
        handleApiErrors(response);
        return null;
      }
    },
  });

  return (
    <div>
      <h2 className={styles.title}> Manage Record</h2>
      <div className={styles.container}>
        <div className={styles.header}>
          <AppSearchInput
            placeholder="Search name/title"
            onSearchDone={(value) => {
              setSearch(value);
            }}
          />

          <button
            className={styles.updateButton}
            onClick={() => setIsModalOpen(true)}
          >
            <FaPlus /> Upload Content
          </button>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>
                Name/Title <TbCaretUpDownFilled />
              </th>
              <th>
                Category <TbCaretUpDownFilled />
              </th>
              <th>
                Added by <TbCaretUpDownFilled />
              </th>
              <th>
                Type <TbCaretUpDownFilled /> <CiFilter />
              </th>
              <th>
                Status <TbCaretUpDownFilled /> <CiFilter />
              </th>
              <th>
                Date Created <TbCaretUpDownFilled />
              </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {isDataLoading ? (
              <DuplicateLoader
                loader={
                  <tr>
                    <td>
                      <AppLoadingSkeleton />
                    </td>
                    <td>
                      <AppLoadingSkeleton />
                    </td>
                    <td>
                      <AppLoadingSkeleton />
                    </td>
                    <td>
                      <AppLoadingSkeleton />
                    </td>
                    <td>
                      <AppLoadingSkeleton />
                    </td>
                    <td>
                      <AppLoadingSkeleton />
                    </td>
                    <td>
                      <button className={styles.viewButton}>View</button>
                    </td>
                  </tr>
                }
              />
            ) : !data || data?.length < 1 ? (
              <div>
                <EmptyTableData />
              </div>
            ) : (
              data?.map((item, index) => (
                <tr key={index}>
                  <td>{item.title}</td>
                  <td>{item.category}</td>
                  <td>{item.requestedBy}</td>
                  <td></td>
                  <td className={styles[item.status.toLowerCase()]}>
                    <GrStatusGoodSmall /> {item.status}
                  </td>
                  <td>
                    {dayJSFormatter(item.createdAt, "DD-MMM-YYYY, h:mma")}
                  </td>
                  <td>
                    <button
                      className={styles.viewButton}
                      onClick={() => setIsUpdateOpen(true)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
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

        {/* Modals */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <UploadForm onClose={(data) => handleUpload(data)} />
        </Modal>

        <Modal isOpen={isUpdateOpen} onClose={() => setIsUpdateOpen(false)}>
          <UpdateForm
            onClose={() => setIsUpdateOpen(false)}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        </Modal>

        {isLoading && (
          <Modal isOpen={true} onClose={() => setIsLoading(false)}>
            <div className={styles.loader}></div>
          </Modal>
        )}

        {successMessage && !isLoading && (
          <Modal isOpen={true} onClose={() => setSuccessMessage("")}>
            <SuccessCard
              message={successMessage}
              onClose={() => setSuccessMessage("")}
            />
          </Modal>
        )}
      </div>
    </div>
  );
}
