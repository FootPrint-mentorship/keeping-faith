import { useState } from "react";
import styles from "../../styles/recordManagement.module.scss";
import { GrStatusGoodSmall } from "react-icons/gr";
import { TbCaretUpDownFilled } from "react-icons/tb";
import { IoSearch } from "react-icons/io5";
import { CiFilter } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import Modal from "@/components/common/Modal";
import UploadForm from "@/components/sadmin/uploadForm";
import SuccessCard from "@/components/sadmin/Successcard";
import UpdateForm from "@/components/sadmin/Updateform";

const data = [
  {
    name: "Private & Worship",
    category: "Video",
    addedBy: "Dami Adeloba",
    type: "Newest",
    status: "Approved",
    date: "21-Oct-2023, 10:04am",
  },
  {
    name: "Divine Adoration",
    category: "Audio",
    addedBy: "John Mark",
    type: "Most Viewed",
    status: "Pending",
    date: "21-Oct-2023, 10:04am",
  },
  {
    name: "Sacred Devotion",
    category: "Book",
    addedBy: "Dami Adeloba",
    type: "Newest",
    status: "Approved",
    date: "21-Oct-2023, 10:04am",
  },
  {
    name: "Heavenly Awareness",
    category: "Video",
    addedBy: "Kola Mark",
    type: "Newest",
    status: "Pending",
    date: "21-Oct-2023, 10:04am",
  },
  {
    name: "Spiritual Homage",
    category: "Video",
    addedBy: "Kola Mark",
    type: "Newest",
    status: "Approved",
    date: "21-Oct-2023, 10:04am",
  },
];

export default function ManageRecord() {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteSuccessful, setIsDeleteSuccessful] = useState(false);
  const [isUpdateSuccessful, setIsUpdateSuccessful] = useState(false);

  const handleDelete = () => {
    setIsUpdateOpen(false); // Close the update modal
    setIsLoading(true); // Show loading spinner

    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage("Record deleted successfully!");
    }, 1500);
  };

  const handleUpdate = () => {
    setIsUpdateOpen(false); // Close the update modal
    setIsLoading(true); // Show loading spinner

    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage("Update successful!");
    }, 1500);
  };

  const handleUploadSuccess = (message: string) => {
    setIsModalOpen(false);
    setIsUpdateOpen(false);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage(message);
    }, 1500);
  };

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2 className={styles.title}> Manage Record</h2>
      <div className={styles.container}>
        <div className={styles.header}>
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
            {filteredData.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.addedBy}</td>
                <td>{item.type}</td>
                <td className={styles[item.status.toLowerCase()]}>
                  <GrStatusGoodSmall /> {item.status}
                </td>
                <td>{item.date}</td>
                <td>
                  <button
                    className={styles.viewButton}
                    onClick={() => setIsUpdateOpen(true)}
                  >
                    View
                  </button>
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

        {/* Modals */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <UploadForm
            onClose={() =>
              handleUploadSuccess("Upload added & published successfully!")
            }
          />
        </Modal>

        {/* <Modal isOpen={isUpdateOpen} onClose={() => setIsUpdateOpen(false)}>
          <UpdateForm
            onClose={() => handleUploadSuccess("Update successful!")}
          />
        </Modal> */}
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

        {/* {successMessage && !isLoading && (
          <Modal isOpen={true} onClose={() => setSuccessMessage("")}>
            <SuccessCard
              message={successMessage}
              onClose={() => setSuccessMessage("")}
            />
          </Modal>
        )} */}
      </div>
    </div>
  );
}
