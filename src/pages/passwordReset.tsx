import { useAuth } from "@/hooks/useAuth";
import styles from "@/styles/PasswordReset.module.scss";
import verifyStyles from "@/styles/resetModal.module.scss";
import axios from "axios";
import Link from "next/link";
import { FormEvent, useState } from "react";

interface PasswordResetFormData {
  code: string;
  newPassword: string;
  confirmPassword: string;
}

export default function PasswordReset() {
  // const router = useRouter();
  const [formData, setFormData] = useState<PasswordResetFormData>({
    code: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [isResending, setIsResending] = useState(false);
  const [resendError, setResendError] = useState<string | null>(null);

  const { resetPassword } = useAuth();
  const { isError, error, isSuccess, isPending } = resetPassword;

  const validateForm = () => {
    if (!formData.code || !formData.newPassword || !formData.confirmPassword) {
      return "All fields are required";
    }
    if (formData.newPassword !== formData.confirmPassword) {
      return "Passwords do not match";
    }
    if (formData.newPassword.length < 8) {
      return "Password must be at least 8 characters long";
    }
    return null;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      return;
    }

    resetPassword.mutate(formData);
  };

  const handleResendCode = async () => {
    setIsResending(true);
    setResendError(null);

    try {
      // Get email from localStorage that was saved during forgot password
      const email = localStorage.getItem("resetEmail");
      if (!email) {
        throw new Error(
          "Email not found. Please try the forgot password process again."
        );
      }

      await axios.post(
        "https://keeping-faith-api.onrender.com/api/v1/auth/resend-reset-code",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Show success message
      alert("Reset code has been resent to your email");
    } catch (err: any) {
      console.error("Error resending code:", err);
      setResendError(
        err.response?.data?.message || err.message || "Failed to resend code"
      );
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.flexContainer}>
        <div className={styles.welcomeText}>
          <h1>Welcome to Keeping Faith</h1>
        </div>

        {isSuccess ? (
          <div className={verifyStyles.container}>
            <div className={verifyStyles.card}>
              <img src="/images/shield.png" alt="Success" />
              <p className={verifyStyles.title}>Success!</p>
              <p className={`${verifyStyles.message} ${verifyStyles.success}`}>
                Password reset successful
              </p>
              <div className={verifyStyles.actions}>
                <Link href="/login" className={verifyStyles.button}>
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.formCard}>
            <div className={styles.formContent}>
              <h1 className={styles.title}>Password Reset</h1>
              <p>A code has been sent to your email</p>

              <form onSubmit={handleSubmit} className={styles.form}>
                {isError && (
                  <div className={styles.error}>
                    {error?.message || "Failed to reset password"}
                  </div>
                )}

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
                      disabled={isResending}
                    >
                      {isResending ? "Sending..." : "Re-send Code"}
                    </button>
                    {resendError && (
                      <div className={styles.error}>{resendError}</div>
                    )}
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
                  disabled={isPending}
                >
                  {isPending ? "Resetting Password..." : "Reset Password"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
