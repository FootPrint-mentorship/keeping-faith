import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import SuccessModal from '@/components/common/SuccessModal';

const VerifyEmail = () => {
  const router = useRouter();
  const { token } = router.query;
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [message, setMessage] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) return;

      try {
        const response = await axios.get(
          `https://keeping-faith-be.onrender.com/api/v1/auth/verify-email/${token}`
        );
        
        if (response.status === 200) {
          setStatus('success');
          setMessage('Email verified successfully! You can now log in to your account.');
          setIsModalOpen(true); // Open the modal on success
        } else {
          setStatus('error');
          setMessage('Verification failed. The link may be invalid or expired.');
        }
      } catch (error) {
        console.error('Verification error:', error);
        setStatus('error');
        setMessage('The verification link may be invalid or expired. Please request a new one.');
      }
    };

    if (token) {
      verifyEmail();
    }
  }, [token]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    router.push('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-orange-50">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-sm text-center">
        {status === 'verifying' && (
          <div>
            <h2 className="text-xl font-bold mb-2">Verifying your email...</h2>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
          </div>
        )}
        
        {status === 'error' && (
          <div>
            <h2 className="text-red-600 text-xl font-bold mb-2">Verification Failed</h2>
            <p className="text-gray-600 mb-4">{message}</p>
            <button 
              onClick={() => router.push('/signup')}
              className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Back to Sign Up
            </button>
          </div>
        )}
      </div>

      <SuccessModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default VerifyEmail;
