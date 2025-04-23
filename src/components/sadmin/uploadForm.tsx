import Joi from "joi";

import { joiSchemas } from "@/utils/schema";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { IoCloseSharp } from "react-icons/io5";
import styles from "../../styles/Uploadform.module.css";
import ErrorMessage from "../common/ErrorMessage";
import { useEffect } from "react";
import { useRecordsStore } from "@/stores/records.store";

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
  subCategory: Joi.string().optional().allow("").label("Sub-Category"),
});
interface UploadFormProps {
  onFormSubmit: (formData: UploadFormData) => void;
  onClose: () => void;
  onDelete: () => void;
}

const categoryOptions = [
  {
    title: "Books",
    value: "books",
  },
  {
    title: "Videos",
    value: "videos",
  },
  {
    title: "Music",
    value: "music",
  },
];

const UploadForm: React.FC<UploadFormProps> = ({
  onFormSubmit,
  onClose,
  onDelete,
}) => {
  const { uploadRecordForm } = useRecordsStore();
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<UploadFormData>({
    resolver: joiResolver(schema),
  });

  useEffect(() => {
    if (!!uploadRecordForm) {
      setValue("category", uploadRecordForm?.category);
      setValue("description", uploadRecordForm?.description);
      setValue("subCategory", uploadRecordForm?.subCategory);
      setValue("title", uploadRecordForm?.title);
    }
  }, [uploadRecordForm]);

  const onSubmit = handleSubmit(async (data) => {
    onFormSubmit(data);
  });

  const isEdit = !!uploadRecordForm;

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
          {categoryOptions?.map(({ title, value }, key) => (
            <option key={key} value={value}>
              {title}
            </option>
          ))}
        </select>
        <ErrorMessage message={errors.category?.message ?? ""} />
        {/* ...............Sub-Category...... */}
        {/* <label htmlFor="subCategory" className={styles.formlabel}>
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
        <ErrorMessage message={errors.subCategory?.message ?? ""} /> */}

        <div className={styles.btn}>
          {/* ......delete btn........ */}
          {isEdit && (
            <button
              className={styles.deletebutton}
              type="button"
              // onClick={onClose}
              onClick={onDelete}
            >
              Delete
            </button>
          )}
          {/* ............. Upload btn ......... */}
          <button className={styles.button} type="submit">
            {isEdit ? "Edit" : "Upload"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadForm;
