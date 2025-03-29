import { useState, FormEvent } from 'react';
import { GoArrowLeft } from "react-icons/go";
import Link from 'next/link';
import styles from '@/styles/Forgotpassword.module.scss';
import { useRouter } from 'next/router';

interface ForgotpasswordFormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

export default function ForgotPassword() {
    const router = useRouter();
  const [formData, setFormData] = useState<ForgotpasswordFormData>({
    firstName: '',
    lastName: '',   
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  const handleContinue = () => {
    router.push('/passwordReset');
  };

  return (
    <div className={styles.container}>
      <div className={styles.flexContainer}>
      <div className={styles.welcomeText}>
        <h1>Welcome to Keeping Faith</h1>
      </div>
      
      <div className={styles.formCard}>
        {/* <div className={styles.header}>
          <span>New user? <Link href="/signin" className={styles.signInLink}>Sign Up</Link></span>
        </div> */}
        
        <div className={styles.formContent}>
          <h1 className={styles.title}>Forgot Password</h1>
          <p>A code will be sent to the email provided. This code will be used to reset your account password.</p>
          
          <form onSubmit={handleSubmit} className={styles.form}>
            
          <div className={styles.inputGroup}>
                <span>Email Address</span>
              <input
                type="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
            </div>

            <div className={styles.termsGroup}>
              <label className={styles.checkbox}>
              <GoArrowLeft />
                <span>
            
                I remember my password </span>
                
              </label>               

            </div>
            
            <button type="submit" className={styles.submitButton} onClick={handleContinue}>
              Continue
            </button>
          </form>
        </div>
      </div>

      
      </div>
    </div>
  );
}