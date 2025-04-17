import { useState } from "react";
import Joi from "joi";

import styles from "../../styles/Uploadform.module.css";
import { IoCloseSharp } from "react-icons/io5";
import { joiSchemas } from "@/utils/schema";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import ErrorMessage from "../common/ErrorMessage";

export interface UploadFormData {
  title: string;
  description: string;
  link: string;
  category: string;
  subCategory: string;
}

const schema = Joi.object<UploadFormData>({
  title: joiSchemas.name.label("Title"),
  category: joiSchemas.name,
  description: joiSchemas.name.label("description"),
  link: joiSchemas.name.label("Link"),
  subCategory: joiSchemas.name.label("Sub-Category"),
});
interface UploadFormProps {
  onClose: (formData: UploadFormData) => void;
}

const UploadForm: React.FC<UploadFormProps> = ({ onClose }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UploadFormData>({
    resolver: joiResolver(schema),
  });

  const onSubmit = handleSubmit(async (data) => {
    onClose(data);
  });
  return (
    <div
      style={{
        height: "90dvh",
        overflowY: "scroll",
      }}
      className={styles.uploadContainer}
    >
      <form className={styles.uploadForm} onSubmit={onSubmit}>
        <div className={styles.formname}>
          <h2 className={styles.title}>Upload Content</h2>
          <span>
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
          placeholder="Title"
          {...register("title")}
          id="title"
        />
        <ErrorMessage message={errors.title?.message ?? ""} />

        {/* ...............Description...... */}
        <label htmlFor="description" className={styles.formlabel}>
          Description
        </label>
        <textarea
          className={styles.textarea}
          placeholder="Enter"
          {...register("description")}
          id="description"
        ></textarea>
        <ErrorMessage message={errors.description?.message ?? ""} />

        {/* ...............Link...... */}
        <label htmlFor="link" className={styles.formlabel}>
          Link
        </label>
        <input
          className={styles.input}
          type="text"
          placeholder="Enter"
          {...register("link")}
          id="link"
        />
        <ErrorMessage message={errors.link?.message ?? ""} />
        {/* ...............Category...... */}
        <label htmlFor="category" className={styles.formlabel}>
          Category
        </label>
        <select
          className={styles.select}
          {...register("category")}
          id="category"
        >
          <option value="">Select</option>
          <option value="">Category</option>
          <option value="gallery">Gallery</option>
        </select>
        <ErrorMessage message={errors.category?.message ?? ""} />
        {/* ...............Sub-Category...... */}
        <label htmlFor="subCategory" className={styles.formlabel}>
          SubCategory
        </label>
        <select
          className={styles.select}
          {...register("subCategory")}
          id="subCategory"
        >
          <option value="">Select</option>
          <option value="">Sub Category</option>
        </select>
        <ErrorMessage message={errors.subCategory?.message ?? ""} />

        {/* ...............Upload...... */}
        <div className={styles.btn}>
          <button className={styles.button} type="submit">
            Upload
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadForm;
