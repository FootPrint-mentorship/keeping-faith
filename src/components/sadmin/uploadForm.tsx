import { useState } from "react";
import styles from "../../styles/Uploadform.module.css";
import { IoCloseSharp } from "react-icons/io5";

interface UploadFormProps {
  onClose: () => void;
}

const UploadForm: React.FC<UploadFormProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    link: "",
    category: "",
    subCategory: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    onClose(); // Close modal after submission
  };

  return (
    <div className={styles.uploadContainer}>
      <form className={styles.uploadForm} onSubmit={handleSubmit}>
        <div className={styles.formname}>
          <h2 className={styles.title}>Upload Content</h2>
          <span>
            <IoCloseSharp className={styles.icon} />
          </span>
        </div>

        <label htmlFor="title" className={styles.formlabel}>
          Title
        </label>
        <input
          className={styles.input}
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          id="title"
        />
        <label htmlFor="description" className={styles.formlabel}>
          Description
        </label>
        <textarea
          className={styles.textarea}
          name="description"
          placeholder="Enter"
          value={formData.description}
          onChange={handleChange}
          id="description"
        ></textarea>
        <label htmlFor="link" className={styles.formlabel}>
          link
        </label>
        <input
          className={styles.input}
          type="text"
          name="Enter"
          placeholder="Enter"
          value={formData.link}
          onChange={handleChange}
          id="link"
        />
        <label htmlFor="category" className={styles.formlabel}>
          Category
        </label>
        <select
          className={styles.select}
          name="category"
          value={formData.category}
          onChange={handleChange}
          id="category"
        >
          <option value="">Select</option>
          <option value="">Category</option>
          <option value="gallery">Gallery</option>
        </select>
        <label htmlFor="subCategory" className={styles.formlabel}>
          SubCategory
        </label>
        <select
          className={styles.select}
          name="subCategory"
          value={formData.subCategory}
          onChange={handleChange}
          id="subCategory"
        >
          <option value="">Select</option>
          <option value="">Sub Category</option>
        </select>
        <button className={styles.button} type="submit" onClick={onClose}>
          Upload
        </button>
      </form>
    </div>
  );
};

export default UploadForm;
