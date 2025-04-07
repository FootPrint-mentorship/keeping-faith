import { useState, FormEvent } from 'react';
import Link from 'next/link';
import styles from '@/styles/Login.module.scss';
import { useRouter } from 'next/router';

interface LoginFormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

export default function Login() {
  const [formData, setFormData] = useState<LoginFormData>({
    firstName: '',
    lastName: '',   
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });

  const router = useRouter();

  const handleLogin = () => {
    router.push('/user/user');
  };


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
        <div className={styles.header}>
          <span>New user? <Link href="/signin" className={styles.signInLink}>Sign Up</Link></span>
        </div>
        
        <div className={styles.formContent}>
          <h1 className={styles.title}>Sign into your account</h1>
          
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

            <div className={styles.inputGroup}>
                <span>Password</span>
              <input
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
            </div>
           

           
           


            <div className={styles.termsGroup}>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={formData.acceptTerms}
                  onChange={(e) => setFormData({...formData, acceptTerms: e.target.checked})}
                />
                <span>Keep me signed in </span>
                <Link href="/forgotpassword" className={styles.termsLink}>
                Forgot password
                </Link>
              </label>               

            </div>

            <button type="submit" className={styles.submitButton} onClick={handleLogin}>
              Sign In
            </button>
          </form>
        </div>
      </div>

      
      </div>
    </div>
  );
}