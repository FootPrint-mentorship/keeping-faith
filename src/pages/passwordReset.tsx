import { useState, FormEvent } from 'react';
import styles from '@/styles/PasswordReset.module.scss';

interface PasswordResetFormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

export default function PasswordReset() {
  const [formData, setFormData] = useState<PasswordResetFormData>({
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
            
          <div className={styles.passwordFields}>
            <div className={styles.inputGroup}>
                <span>Enter Reset code</span>
              <input
                type="number"
                placeholder="Enter the reset code sent to your email address"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
            </div>
            <div className={styles.inputGroup}>
                <p>Re-send Code</p>
            </div>
            </div>

            <div className={styles.inputGroup}>
                <span>Enter New Password</span>
              <input
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
            </div>
           
            <div className={styles.inputGroup}>
                <span>Confirm Password</span>
              <input
                type="password"
                placeholder="Re-Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
            </div>
           

           
           



            <button type="submit" className={styles.submitButton}>
              Reset Password
            </button>
          </form>
        </div>
      </div>

      
      </div>
    </div>
  );
}