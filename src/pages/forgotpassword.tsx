import { useState, FormEvent } from 'react';
import { GoArrowLeft } from "react-icons/go";
import styles from '@/styles/Forgotpassword.module.scss';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';
import type { UseMutationResult } from '@tanstack/react-query';
import type { ForgotPasswordData } from '@/services/authService';

interface ForgotPasswordFormData {
  email: string;
}

export default function ForgotPassword() {
  const router = useRouter();
  const [formData, setFormData] = useState<ForgotPasswordFormData>({
    email: ''
  });

  const { forgotPassword } = useAuth();
  const { isPending, isError, error, isSuccess } = forgotPassword as UseMutationResult<any, Error, ForgotPasswordData>;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!formData.email) {
      return;
    }

    forgotPassword.mutate({ email: formData.email });
  };

  const handleBackToLogin = () => {
    router.push('/login');
  };

  return (
    <div className={styles.container}>
      <div className={styles.flexContainer}>
        <div className={styles.welcomeText}>
          <h1>Welcome to Keeping Faith</h1>
        </div>
        
        <div className={styles.formCard}>
          <div className={styles.formContent}>
            <h1 className={styles.title}>Forgot Password</h1>
            <p>A code will be sent to the email provided. This code will be used to reset your account password.</p>
            
            <form onSubmit={handleSubmit} className={styles.form}>
              {isError && <div className={styles.error}>{error?.message || 'Failed to send reset instructions'}</div>}
              {isSuccess && <div className={styles.success}>Password reset instructions have been sent to your email.</div>}
              
              <div className={styles.inputGroup}>
                <span>Email Address</span>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>

              <div className={styles.termsGroup}>
                <button type="button" onClick={handleBackToLogin} className={styles.backButton}>
                  <GoArrowLeft />
                  <span>I remember my password</span>
                </button>
              </div>
              
              <button 
                type="submit" 
                className={styles.submitButton}
                disabled={isPending}
              >
                {isPending ? 'Sending...' : 'Continue'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}