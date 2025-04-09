import { useState, FormEvent } from 'react';
import Link from 'next/link';
import styles from '@/styles/Login.module.scss';
import { useRouter } from 'next/router';

interface LoginFormData {
  email: string;
  password: string;
  keepSignedIn: boolean;
}

export default function Login() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    keepSignedIn: false
  });

  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');


    if (!formData.email || !formData.password) {
      setError('Email and password are required');
      return;
    }

    setIsLoading(true);

    try {
      console.log('Sending login request...');
      const response = await fetch('https://keeping-faith-api.onrender.com/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();
      console.log('API Response:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

     
      if (data.token) {
        if (formData.keepSignedIn) {
          localStorage.setItem('token', data.token);
        } else {
          sessionStorage.setItem('token', data.token);
        }
      }

    
      console.log('Login successful!');
      setSuccess('Login successful! Redirecting...');
      
 setTimeout(() => {
        router.push('/user/user');
      }, 1000);
    } catch (err) {
      console.error('Login error:', err);
      setError(err instanceof Error ? err.message : 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.flexContainer}>
        <div className={styles.welcomeText}>
          <h1>Welcome to Keeping Faith</h1>
        </div>
        
        <div className={styles.formCard}>
          <div className={styles.header}>
            <span>New user? <Link href="/signup" className={styles.signInLink}>Sign Up</Link></span>
          </div>
          
          <div className={styles.formContent}>
            <h1 className={styles.title}>Sign into your account</h1>
            
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
                    checked={formData.keepSignedIn}
                    onChange={(e) => setFormData({...formData, keepSignedIn: e.target.checked})}
                  />
                  <span>Keep me signed in </span>
                </label>
                <Link href="/forgotpassword" className={styles.termsLink}>
                  Forgot password?
                </Link>
              </div>

              <button 
                type="submit" 
                className={styles.submitButton}
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}