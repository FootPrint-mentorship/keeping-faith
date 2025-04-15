import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';
import styles from '@/styles/VerifyEmail.module.scss'; // adjust path if necessary

const VerifyEmail = () => {
  const router = useRouter();
  const { token } = router.query;
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) return;

      try {
        console.log('Verifying token:', token);
        const response = await axios.get(
          `https://keeping-faith-be.onrender.com/api/v1/auth/verify-email/${token}`
        );

        console.log('Verification response:', response);

        if (response.status === 200) {
          setStatus('success');
        } else {
          setStatus('error');
        }
      } catch (error) {
        console.log('Verification error:', error);
        setStatus('error');
      }
    };

    if (token) {
      verifyEmail();
    }
  }, [token]);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {status === 'verifying' && (
          <>
            <h2 className={styles.title}>Verifying your email...</h2>
            <p className={`${styles.message}`}>Please wait while we verify your email.</p>
            <div className={styles.loading}></div>
          </>
         )}

         {status === 'error' && (
          <>
            <h2 className={styles.title}>Verification Failed</h2>
            <p className={`${styles.message} ${styles.error}`}>
              The verification link may be invalid or expired. Please try signing up again.
            </p>
            <div className={styles.actions}>
              <Link href="/signup" className={styles.button}>
                Back to Sign Up
              </Link>
            </div>
          </>
        )}

        {status === 'success' && (
          <>
          <img src="/images/shield.png" alt="Success" />
            <p className={styles.title}>Success!</p>
            <p className={`${styles.message} ${styles.success}`}>Sign up successful</p>
            <div className={styles.actions}>
              <Link href="/login" className={styles.button}>
                Sign In
              </Link>
            </div>
          </>
         )}
      </div>
    </div>
  );
};

export default VerifyEmail;
