import { useState, FormEvent } from "react";
import styles from "@/styles/PasswordReset.module.scss";
import { useRouter } from "next/router";
import axios, { AxiosError } from "axios";

interface PasswordResetFormData {
  code: string;
  newPassword: string;
  confirmPassword: string;
}

export default function PasswordReset() {
  const router = useRouter();
  const [formData, setFormData] = useState<PasswordResetFormData>({
    code: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const validateForm = () => {
    if (!formData.code || !formData.newPassword || !formData.confirmPassword) {
      setError("All fields are required");
      return false;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    if (formData.newPassword.length < 8) {
      setError("Password must be at least 8 characters long");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://keeping-faith-api.onrender.com/api/v1/auth/reset_password",
        {
          code: formData.code,
          newPassword: formData.newPassword,
          confirmPassword: formData.confirmPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setSuccess("Password has been reset successfully!");
        // Wait a moment before redirecting to login
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      setError(
        err.response?.data?.message ||
          "Failed to reset password. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {};

  return (
    <div className={styles.container}>
      <div className={styles.flexContainer}>
        <div className={styles.welcomeText}>
          <h1>Welcome to Keeping Faith</h1>
        </div>

        <div className={styles.formCard}>
          <div className={styles.formContent}>
            <h1 className={styles.title}>Password Reset</h1>
            <p>A code has been sent to your email</p>

            <form onSubmit={handleSubmit} className={styles.form}>
              {error && <div className={styles.error}>{error}</div>}
              {success && <div className={styles.success}>{success}</div>}

              <div className={styles.passwordFields}>
                <div className={styles.inputGroup}>
                  <span>Enter Reset code</span>
                  <input
                    type="text"
                    placeholder="Enter the reset code sent to your email address"
                    value={formData.code}
                    onChange={(e) =>
                      setFormData({ ...formData, code: e.target.value })
                    }
                    required
                  />
                </div>
                <div className={styles.inputGroup}>
                  <button
                    type="button"
                    onClick={handleResendCode}
                    className={styles.resendButton}
                  >
                    Re-send Code
                  </button>
                </div>
              </div>

              <div className={styles.inputGroup}>
                <span>Enter New Password</span>
                <input
                  type="password"
                  placeholder="Enter your new password"
                  value={formData.newPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, newPassword: e.target.value })
                  }
                  required
                  minLength={8}
                />
              </div>

              <div className={styles.inputGroup}>
                <span>Confirm Password</span>
                <input
                  type="password"
                  placeholder="Re-enter your new password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <button
                type="submit"
                className={styles.submitButton}
                disabled={isLoading}
              >
                {isLoading ? "Resetting Password..." : "Reset Password"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
