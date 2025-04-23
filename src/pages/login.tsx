import { Login } from "@/api/auth.api";
import { apiConstants } from "@/api/misc/constants.api";
import { useAuthContext } from "@/contexts/AuthContext";
import routes from "@/navigation/routes";
import { useAuthStore } from "@/stores/auth.store";
import styles from "@/styles/Login.module.scss";
import { appToast } from "@/utils/appToast";
import { handleApiErrors } from "@/utils/handleErrors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

interface LoginFormData {
  email: string;
  password: string;
  keepSignedIn: boolean;
}

export default function LoginPage() {
  // const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
    keepSignedIn: false,
  });
  const loginAPI = useMutation({ mutationFn: Login });
  const queryClient = useQueryClient();
  const { setLoginResponse } = useAuthStore();
  const router = useRouter();
  const { login } = useAuthContext();

  // const { login } = useAuth();
  // const { isPending, isError, error, isSuccess } = login as UseMutationResult<
  //   any,
  //   Error,
  //   LoginFormData
  // >;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return appToast.Info("Email and password are required");
    }

    const data = {
      email: formData?.email?.toLowerCase()?.trim(),
      password: formData?.password?.trim(),
    };
    const response = await loginAPI.mutateAsync(data);

    if (response?.ok && response?.data) {
      setLoginResponse(response?.data);
      appToast.Success(response?.data?.message ?? "Login successfully.");
      queryClient.invalidateQueries();
      login({
        access: response?.data?.access,
        keepSignedIn: formData?.keepSignedIn,
      });
      if (
        response?.data?.user?.role === apiConstants.ACCOUNT_STATUS.SUPER_ADMIN
      ) {
        router.push(routes.ADMIN_DASHBOARD);
      } else {
        router.push(routes.USER_DASHBOARD);
      }
    } else handleApiErrors(response);
    // try {
    //   login.mutate(formData);
    // } catch (error: any) {
    //   console.error('Login submission error:', error);
    //   setErrorMessage(error.message || "An error occurred during login");
    // }
  };

  // useEffect(() => {
  //   if (isError) {
  //     // @ts-ignore
  //     const errorMsg = error?.response?.data?.message || error?.message || "An error occurred";
  //     setErrorMessage(errorMsg);
  //     setTimeout(() => {
  //       setErrorMessage("");
  //     }, 5000);
  //   }
  // }, [isError, error]);

  const isPending = loginAPI?.isPending;

  return (
    <div className={styles.container}>
      <div className={styles.flexContainer}>
        <div className={styles.welcomeText}>
          <h1>Welcome to Keeping Faith</h1>
        </div>

        <div className={styles.formCard}>
          <div className={styles.header}>
            <span>
              New user?{" "}
              <Link href="/signup" className={styles.link}>
                Sign Up
              </Link>
            </span>
          </div>

          <div className={styles.formContent}>
            <h1 className={styles.title}>Login</h1>

            <form onSubmit={handleSubmit} className={styles.form}>
              {/* {errorMessage != "" && (
                <div className={styles.error}>{errorMessage}</div>
              )} */}
              {/* {isSuccess && (
                <div className={styles.success}>
                  Login successful! Redirecting...
                </div>
              )} */}

              <div className={styles.inputGroup}>
                <span>Email Address</span>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <span>Password</span>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                />
              </div>

              <div className={styles.termsGroup}>
                <label className={styles.checkbox}>
                  <input
                    type="checkbox"
                    checked={formData.keepSignedIn}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        keepSignedIn: e.target.checked,
                      })
                    }
                  />
                  <span>Keep me signed in</span>
                </label>

                <Link href="/forgotpassword" className={styles.link}>
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                className={styles.submitButton}
                disabled={isPending}
              >
                {isPending ? "Logging in..." : "Login"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
