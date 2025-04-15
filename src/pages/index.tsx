
import { useState, FormEvent } from 'react';
import Link from 'next/link';
import styles from '@/styles/Signup.module.scss';
import axios from 'axios';


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

  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setError('');
    setSuccess('');
    
    // Validation
    if (!formData.acceptTerms) {
      setError('Please accept the terms and conditions');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phoneNumber || !formData.password) {
      setError('All fields are required');
      return;
    }

    setIsLoading(true);

    try {
      console.log('Sending registration request with data:', {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone_number: formData.phoneNumber,
        // Not logging password for security
      });

      const response = await axios.post(
        'https://keeping-faith-api.onrender.com/api/v1/auth/register',
        {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone_number: formData.phoneNumber,
          password: formData.password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Full API Response:', {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        data: response.data
      });

      // Successful registration
      console.log('Registration successful!');
      setSuccess(
        'Registration successful! Please check your email to verify your account. ' +
        'Click the verification link in the email to complete the registration process. ' +
        'Note: The email might take a few minutes to arrive and could be in your spam folder.'
      );
      
      // Clear the form
      setFormData({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false
      });
    } catch (error) {
      console.error('Registration error:', error);
      if (axios.isAxiosError(error)) {
        console.log('Detailed error information:', {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
          headers: error.response?.headers
        });
        
        const errorMessage = error.response?.data?.message || error.message;
        setError(`Registration failed: ${errorMessage}`);
      } else {
        setError('An error occurred during registration. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }

  };

  return (
    <div className={styles.container}>
      <div className={styles.flexContainer}>
        <div className={styles.formCard}>
          <div className={styles.header}>

            <span>Existing user? <Link href="/login" className={styles.signInLink}>Sign In</Link></span>
          </div>
          
          <div className={styles.formContent}>
            <h1 className={styles.title}>Create Your Account</h1>
            
            <form onSubmit={handleSubmit} className={styles.form}>
              {error && <div className={styles.error}>{error}</div>}
              {success && <div className={styles.success}>{success}</div>}
              

              <div className={styles.nameFields}>
                <div className={styles.inputGroup}>
                  <span>First Name</span>
                  <input
                    type="text"
                    placeholder="Enter your first name"
                    value={formData.firstName}

                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}

                  />
                </div>
                <div className={styles.inputGroup}>
                  <span>Last Name</span>
                  <input
                    type="text"
                    placeholder="Enter your last name"
                    value={formData.lastName}

                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}

                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <span>Phone Number</span>
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.phoneNumber}

                  onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}

                />
              </div>

              <div className={styles.inputGroup}>
                <span>Email Address</span>
                <input
                  type="email"
                  placeholder="Enter your email address"

                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div className={styles.passwordFields}>
                <div className={styles.inputGroup}>
                  <span>Password</span>
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
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  />
                </div>
              </div>

              <div className={styles.termsGroup}>
                <label className={styles.checkbox}>
                  <input
                    type="checkbox"
                    checked={formData.acceptTerms}
                    onChange={(e) => setFormData({...formData, acceptTerms: e.target.checked})}
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
                disabled={isLoading}
              >
                {isLoading ? 'Signing up...' : 'Sign Up'}

              </button>
            </form>
          </div>
        </div>

        <div className={styles.welcomeText}>

          <h1>Welcome to Keeping Faith</h1>

        </div>
      </div>
    </div>
  );
}
