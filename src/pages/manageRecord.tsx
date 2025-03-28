import { useState } from "react";
import styles from "../styles/Managerecord.module.scss";
import { GrStatusGoodSmall } from "react-icons/gr";
import { TbCaretUpDownFilled } from "react-icons/tb";
import { IoSearch } from "react-icons/io5";
import { CiFilter } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import UploadForm from "@/components/sadmin/uploadForm";
import SuccessCard from "@/components/sadmin/Successcard";
import UpdateForm from "@/components/sadmin/Updateform";
import PendingForm from "@/components/sadmin/Pendingform";
import AddUser from "@/components/sadmin/Adduser";

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

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const [isSuccessOpen, setIsSuccessOpen] = useState(true);

  return (
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
          // onClick={() => setIsModalOpen(true)}
        >
          <span>
            <FaPlus /> &nbsp;
          </span>
          Update Content
        </button>
        {/* Modal................. */}
        {/* {isModalOpen && (
          <Modal onClose={() => setIsModalOpen(false)}>
            <UploadForm onClose={() => setIsModalOpen(false)} />
          </Modal>
        )} */}
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className="headerCell">
              <span> Name/Title</span> <TbCaretUpDownFilled />
            </th>
            <th className="headerCell">
              <span>Category </span>
              <TbCaretUpDownFilled />
            </th>
            <th className="headerCell">
              <span> Added by</span> <TbCaretUpDownFilled />
            </th>
            <th className="headerCell">
              <span>Type</span> <TbCaretUpDownFilled /> <CiFilter />
            </th>
            <th className="headerCell">
              <span>Status</span> <TbCaretUpDownFilled /> <CiFilter />
            </th>
            <th className="headerCell">
              <span> Date Created</span> <TbCaretUpDownFilled />
            </th>
            <th className="headerCell">
              <span> Action</span> <TbCaretUpDownFilled />
            </th>
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
                <button className={styles.viewButton}>View</button>
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
          <button className={`${styles.pageButton} ${styles.active}`}>1</button>
          <button className={styles.pageButton}>2</button>
          <button className={styles.pageButton} disabled>
            Next
          </button>
        </div>
      </div>
      {/* .......................test */}
      <UploadForm
        onClose={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
      <SuccessCard
        message="Upload added & published successfully!"
        onClose={() => setIsSuccessOpen(false)}
      />
      <UpdateForm
        onClose={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
      <span style={{ marginTop: "40px" }}>
        <PendingForm
          onClose={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      </span>
      <AddUser />
    </div>
  );
}
