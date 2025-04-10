import { useState } from "react";
import styles from "../../styles/usermanagement.module.scss";
import { TbCaretUpDownFilled } from "react-icons/tb";
import { IoSearch } from "react-icons/io5";
import { CiFilter } from "react-icons/ci";
import { IoMdPerson } from "react-icons/io";

const data = [
  {
    name: "Ada Judge",
    role: "Admin",
    date: "21-Oct-2023, 10:04am",
  },
  {
    name: "Mike Spencer",
    role: "Admin",
    date: "21-Oct-2023, 10:04am",
  },
  {
    name: "Agutullah Okwuu",
    role: "User",
    date: "21-Oct-2023, 10:04am",
  },
];

export default function UserManagement() {
  const [search, setSearch] = useState("");

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

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

        <button className={styles.updateButton}>+ Update Content</button>
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
          {filteredData.map((item, index) => (
            <tr key={index}>
              <td className={styles.nameCell}>
                <div className={styles.nameWrapper}>
                  <IoMdPerson className={styles.person} />
                  <span>{item.name}</span>
                </div>
              </td>
              <td>{item.role}</td>
              <td>{item.date}</td>
              <td>
                <button className={styles.viewButton}>Update</button>
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
    </div>
  );
}
