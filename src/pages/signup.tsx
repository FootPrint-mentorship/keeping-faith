import { useState, FormEvent } from "react";
import Link from "next/link";
import styles from "@/styles/Signup.module.scss";
import { useAuth } from "@/hooks/useAuth";
import type { UseMutationResult } from "@tanstack/react-query";
import type { SignupData } from "@/services/authService";

interface SignupFormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

export default function Signup() {
  const [formData, setFormData] = useState<SignupFormData>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });

  const { signup } = useAuth();
  const { isPending, isError, error, isSuccess } = signup as UseMutationResult<
    any,
    Error,
    SignupData
  >;

  const validateForm = () => {
    if (!formData.acceptTerms) {
      return "Please accept the terms and conditions";
    }

    if (formData.password !== formData.confirmPassword) {
      return "Passwords do not match";
    }

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phoneNumber ||
      !formData.password
    ) {
      return "All fields are required";
    }

    return null;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      return;
    }

    signup.mutate({
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone_number: formData.phoneNumber,
      password: formData.password,
    });
  };

  const clearForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    });
  };

  if (isSuccess && formData.firstName != "") {
    clearForm();
  }
  console.log(isSuccess);
  console.log(error);

  return (
    <div className={styles.container}>
      <div className={styles.flexContainer}>
        <div className={styles.formCard}>
          <div className={styles.header}>
            <span>
              Existing user?{" "}
              <Link href="/login" className={styles.signInLink}>
                Sign In
              </Link>
            </span>
          </div>
          <h1 className={styles.mobileTitle}>Welcome to Keeping Faith</h1>

          <div className={styles.formContent}>
            <h1 className={styles.title}>Create Your Account</h1>

            <form onSubmit={handleSubmit} className={styles.form}>
              {isError && (
                <div className={styles.error}>
                 {   ///@ts-ignore
                  error?.response?.data?.message ||
                    "An error occurred during registration. Please try again."}
                </div>
              )}
              {isSuccess && (
                <div className={styles.success}>
                  Registration successful! Please check your email to verify
                  your account. Click the verification link in the email to
                  complete the registration process. Note: The email might take
                  a few minutes to arrive and could be in your spam folder.
                </div>
              )}

              <div className={styles.nameFields}>
                <div className={styles.inputGroup}>
                  <span>First Name</span>
                  <input
                    type="text"
                    placeholder="Enter your first name"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    required
                  />
                </div>
                <div className={styles.inputGroup}>
                  <span>Last Name</span>
                  <input
                    type="text"
                    placeholder="Enter your last name"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <span>Phone Number</span>
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, phoneNumber: e.target.value })
                  }
                  required
                />
              </div>

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

              <div className={styles.passwordFields}>
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
                    minLength={8}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <span>Confirm Password</span>
                  <input
                    type="password"
                    placeholder="Confirm your password"
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
              </div>

              <div className={styles.termsGroup}>
                <label className={styles.checkbox}>
                  <input
                    type="checkbox"
                    checked={formData.acceptTerms}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        acceptTerms: e.target.checked,
                      })
                    }
                    required
                  />
                  <span>I accept the terms and conditions</span>
                </label>
              </div>

              <button
                type="submit"
                className={styles.submitButton}
                disabled={isPending}
              >
                {isPending ? "Creating Account..." : "Create Account"}
              </button>
            </form>
          </div>
        </div>

        <div className={styles.welcomeText}>
          <h1>
            Welcome to <br /> Keeping Faith
          </h1>
        </div>
      </div>
    </div>
  );
}
