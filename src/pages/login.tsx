import { useState, FormEvent, useEffect } from "react";
import Link from "next/link";
import styles from "@/styles/Login.module.scss";
import { useAuth } from "@/hooks/useAuth";
import type { UseMutationResult } from "@tanstack/react-query";

interface LoginFormData {
  email: string;
  password: string;
  keepSignedIn: boolean;
}

export default function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
    keepSignedIn: false,
  });

  const { login } = useAuth();
  const { isPending, isError, error, isSuccess } = login as UseMutationResult<
    any,
    Error,
    LoginFormData
  >;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setErrorMessage("Email and password are required");
      return;
    }

    try {
      login.mutate(formData);
    } catch (error: any) {
      console.error('Login submission error:', error);
      setErrorMessage(error.message || "An error occurred during login");
    }
  };

  useEffect(() => {
    if (isError) {
      // @ts-ignore
      const errorMsg = error?.response?.data?.message || error?.message || "An error occurred";
      setErrorMessage(errorMsg);
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }
  }, [isError, error]);

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
              {errorMessage != "" && (
                <div className={styles.error}>{errorMessage}</div>
              )}
              {isSuccess && (
                <div className={styles.success}>
                  Login successful! Redirecting...
                </div>
              )}

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
