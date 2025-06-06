import { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import styles from "../../styles/Updateform.module.scss";

interface UpdateFormProps {
  onClose: () => void;
  onDelete?: () => void;
  onUpdate?: (data: UpdateForm) => void;
  defaultData: UpdateForm;
}

interface UpdateForm {
  title: string;
  description: string;
  link: string;
  category: string;
  subCategory: string;
}

const UpdateForm: React.FC<UpdateFormProps> = ({
  onClose,
  onDelete,
  onUpdate,
  defaultData,
}) => {
  const [formData, setFormData] = useState<UpdateForm>(defaultData);

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
  // const PreviewImage = "/images/placeholder.png";

  return (
    <div
      style={{
        height: "80dvh",
        overflowY: "scroll",
        paddingTop: 100,
        paddingBottom: 50,
      }}
      className={styles.uploadContainer}
    >
      <form className={styles.uploadForm} onSubmit={handleSubmit}>
        <div className={styles.formname}>
          <h2 className={styles.title}>Update Content</h2>
          <span onClick={onClose}>
            <IoCloseSharp className={styles.icon} />
          </span>
        </div>

        {/* ...............title...... */}
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
        {/* ...............Description...... */}
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
        {/* ...............Link...... */}
        <label htmlFor="link" className={styles.formlabel}>
          Link
        </label>
        <input
          className={styles.input}
          type="text"
          name="link"
          placeholder="Enter"
          value={formData.link}
          onChange={handleChange}
          id="link"
        />
        {/* ...............Category...... */}
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
        {/* ...............Sub-Category...... */}
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
        {/* <PreviewCard
          image={PreviewImage}
          title={"Praise & Worship S"}
          description={
            "Praise and worship viseo by Odunsi, this features powerfull praise to the lord"
          }
          duration={"1hr 30s"}
          link={""}
        /> */}

        <div className={styles.btn}>
          {/* ......delete btn........ */}
          <button
            className={styles.deletebutton}
            type="submit"
            // onClick={onClose}
            onClick={onDelete || onClose}
          >
            Delete
          </button>
          {/* ............. Upload btn ......... */}
          <button
            className={styles.button}
            type="submit"
            onClick={() => onUpdate}
            // onClick={onClose}
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateForm;
