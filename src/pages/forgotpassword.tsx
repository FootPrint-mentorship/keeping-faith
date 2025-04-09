import { useState, FormEvent } from 'react';
import { GoArrowLeft } from "react-icons/go";
import styles from '@/styles/Forgotpassword.module.scss';
import { useRouter } from 'next/router';
import axios from 'axios';

interface ForgotPasswordFormData {
  email: string;
}

export default function ForgotPassword() {
  const router = useRouter();
  const [formData, setFormData] = useState<ForgotPasswordFormData>({
    email: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.post(
        'https://keeping-faith-api.onrender.com/api/v1/auth/forgot-password',
        {
          email: formData.email
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status === 200) {
        setSuccess('Password reset instructions have been sent to your email.');
        setTimeout(() => {
          router.push('/passwordReset');
        }, 2000);
      }
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to send reset instructions. Please try again.');
    } finally {
      setIsLoading(false);
    }
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
              {error && <div className={styles.error}>{error}</div>}
              {success && <div className={styles.success}>{success}</div>}
              
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
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Continue'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}