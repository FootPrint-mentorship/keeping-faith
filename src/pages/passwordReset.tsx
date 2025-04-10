import { useState, FormEvent, useEffect } from 'react';
import styles from '@/styles/PasswordReset.module.scss';
import verifyStyles from '@/styles/resetModal.module.scss';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';
import type { UseMutationResult } from '@tanstack/react-query';
import type { ResetPasswordData } from '@/services/authService';
import Link from 'next/link';

interface PasswordResetFormData {
  code: string;
  newPassword: string;
  confirmPassword: string;
}

export default function PasswordReset() {
  const router = useRouter();
  const [formData, setFormData] = useState<PasswordResetFormData>({
    code: '',
    newPassword: '',
    confirmPassword: ''
  });

  const { resetPassword } = useAuth();
  const {  isError, error, isSuccess, isPending } = resetPassword;

  const validateForm = () => {
    if (!formData.code || !formData.newPassword || !formData.confirmPassword) {
      return 'All fields are required';
    }
    if (formData.newPassword !== formData.confirmPassword) {
      return 'Passwords do not match';
    }
    if (formData.newPassword.length < 8) {
      return 'Password must be at least 8 characters long';
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

  // useEffect(() => {
  //   if (isSuccess) {
  //     setTimeout(() => {
        
  //     }, 5000);
  //     router.push('/login');
  //   }
  // }, [isSuccess, router]);

  const handleResendCode = async () => {
    // You can implement this by calling forgotPassword mutation again
    // with the email from localStorage or context
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
              <p className={`${verifyStyles.message} ${verifyStyles.success}`}>Password reset successful</p>
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
                {isError && <div className={styles.error}>{error?.message || 'Failed to reset password'}</div>}
                
                <div className={styles.passwordFields}>
                  <div className={styles.inputGroup}>
                    <span>Enter Reset code</span>
                    <input
                      type="text"
                      placeholder="Enter the reset code sent to your email address"
                      value={formData.code}
                      onChange={(e) => setFormData({...formData, code: e.target.value})}
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
                    onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
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
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    required
                  />
                </div>

                <button 
                  type="submit" 
                  className={styles.submitButton}
                  disabled={isPending}
                >
                  {isPending ? 'Resetting Password...' : 'Reset Password'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}