import { UserRole } from "@/types/api/auth.types";
import { AddUserReq } from "@/types/api/superadmin.types";
import { joiSchemas } from "@/utils/schema";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { useForm } from "react-hook-form";
import { IoCloseSharp } from "react-icons/io5";
import styles from "../../styles/Adduser.module.scss";
import ErrorMessage from "../common/ErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addUser } from "@/api/superadmin.api";
import { handleApiErrors } from "@/utils/handleErrors";
import { appToast } from "@/utils/appToast";
import queryKeys from "@/api/misc/queryKeys";
import { USER_ROLES_LIST } from "@/api/misc/constants.api";

interface AddUserProps {
  onClose: () => void;
}

const schema = Joi.object<AddUserReq>({
  email: joiSchemas.email,
  first_name: joiSchemas.name.label("First name"),
  last_name: joiSchemas.name.label("Last name"),
  password: joiSchemas.strictPassword,
  phone_number: joiSchemas.phone.label("Phone number"),
  role: Joi.string<UserRole>().required(),
});

// const AddUser = () => {
const AddUser: React.FC<AddUserProps> = ({ onClose }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<AddUserReq>({
    resolver: joiResolver(schema),
  });
  const queryClient = useQueryClient();

  const addUserAPI = useMutation({ mutationFn: addUser });
  const isLoading = addUserAPI?.isPending;

  const onSubmit = handleSubmit(async (data) => {
    const formattedData: AddUserReq = {
      email: data?.email?.toLowerCase()?.trim(),
      first_name: data?.first_name?.trim(),
      last_name: data?.last_name?.trim(),
      password: data?.password?.trim(),
      phone_number: data?.phone_number?.trim(),
      role: data?.role,
    };

    const response = await addUserAPI?.mutateAsync(formattedData);
    if (response.ok) {
      appToast.Success(response?.data?.message ?? "User created successfully.");
      onClose?.();
      queryClient.resetQueries({ queryKey: [queryKeys.USERS.ALL] });
    } else handleApiErrors(response);
  });

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.formname}>
          <h2 className={styles.title}>Add User</h2>
          <span className={styles.closed}>
            <IoCloseSharp className={styles.icon} />
          </span>
        </div>

        <form onSubmit={onSubmit}>
          {/* ...........First-name Last-name ....... */}
          <div className={styles.nameFields}>
            <div>
              <div className={styles.inputGroup}>
                <span>First Name</span>
                <input
                  type="text"
                  {...register("first_name")}
                  disabled={isLoading}
                  placeholder="Enter your first name"
                />
              </div>
              <ErrorMessage message={errors?.first_name?.message ?? ""} />
            </div>

            <div>
              <div className={styles.inputGroup}>
                <span>Last Name</span>
                <input
                  type="text"
                  {...register("last_name")}
                  placeholder="Enter your last name"
                  disabled={isLoading}
                />
              </div>
              <ErrorMessage message={errors?.last_name?.message ?? ""} />
            </div>
          </div>

          {/* ..... phone number ....... */}
          <div>
            <div className={styles.inputGroup}>
              <span>Phone Number</span>
              <input
                type="tel"
                {...register("phone_number")}
                placeholder="Enter your phone number"
                disabled={isLoading}
              />
            </div>
            <ErrorMessage message={errors?.phone_number?.message ?? ""} />
          </div>

          {/* ...... Email ... */}
          <div>
            <div className={styles.inputGroup}>
              <span>Email Address</span>
              <input
                type="email"
                {...register("email")}
                placeholder="Enter your email address"
                disabled={isLoading}
              />
            </div>
            <ErrorMessage message={errors?.email?.message ?? ""} />
          </div>

          {/* .... password .... */}
          <div>
            <div className={styles.inputGroup}>
              <span>Password</span>
              <input
                type="password"
                placeholder="Enter your password"
                {...register("password")}
                disabled={isLoading}
              />
            </div>
            <ErrorMessage message={errors?.password?.message ?? ""} />
          </div>

          {/* .... select role .... */}
          <div>
            <div className={styles.inputGroup}>
              <span>Select Role</span>
              <select
                {...register("role")}
                disabled={isLoading}
                className={styles.selectoption}
              >
                {USER_ROLES_LIST?.map(({ title, value }, key) => (
                  <option key={key} value={value}>
                    {title}
                  </option>
                ))}
              </select>
            </div>
            <ErrorMessage message={errors?.role?.message ?? ""} />
          </div>

          {/* <label>Select Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className={styles.selectoption}
          >
            <option value="">User</option>
            <option value="admin">Admin</option>
            <option value="editor">Super Admin</option>
          </select> */}
          <span className={styles.btn}>
            <button
              type="submit"
              disabled={isLoading}
              className={styles.addUserBtn}
            >
              {isLoading ? "Loading..." : "Add User"}
            </button>
          </span>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
