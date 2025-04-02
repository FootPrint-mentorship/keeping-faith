import { useState, FormEvent } from "react";
import Link from "next/link";
import styles from "@/styles/Signup.module.scss";
import { useRouter } from "next/router";

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
  const router = useRouter();
  const [formData, setFormData] = useState<SignupFormData>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  const handleSignup = () => {
    router.push("/login");
  };

  return (
    <div className={styles.container}>
      <div className={styles.flexContainer}>
        <div className={styles.formCard}>
          <div className={styles.header}>
            <span>
              Existing user?{" "}
              <Link href="/signin" className={styles.signInLink}>
                Sign In
              </Link>
            </span>
          </div>

          <div className={styles.formContent}>
            <h1 className={styles.title}>Create Your Account</h1>

            <form onSubmit={handleSubmit} className={styles.form}>
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
                  />
                  <span>I have read and accepted the </span>
                  <Link href="/terms" className={styles.termsLink}>
                    <u>Terms of Use and Privacy Policy</u>
                  </Link>
                </label>
              </div>

              <button
                type="submit"
                className={styles.submitButton}
                onClick={handleSignup}
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>

        <div className={styles.welcomeText}>
          <h1>Welcome to Chillnlearn Christain</h1>
        </div>
      </div>
    </div>
  );
}
