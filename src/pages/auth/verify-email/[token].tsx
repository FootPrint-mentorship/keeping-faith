import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';

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
        console.error('Verification error:', error);
        setStatus('error');
      }
    };

    if (token) {
      verifyEmail();
    }
  }, [token]);

  if (status === 'verifying') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 w-[400px] text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700">Verifying your email...</h2>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 w-[400px] text-center">
          <div className="bg-red-100 rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-4">
            <svg className="h-10 w-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Verification Failed</h2>
          <p className="text-gray-600 mb-6">The verification link may be invalid or expired. Please try signing up again.</p>
          <Link 
            href="/signup"
            className="inline-block w-full bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition-colors font-medium"
          >
            Back to Sign Up
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-8 w-[400px] text-center">
        <div className="bg-[#FFF1EC] rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-6">
          <svg className="h-10 w-10 text-[#FF5722]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-[28px] font-bold text-black mb-2">Success!</h1>
        <p className="text-[#666666] text-lg mb-8">Sign up successful</p>
        <Link
          href="/login"
          className="block w-full bg-[#FF5722] text-white px-8 py-3 rounded-lg hover:bg-[#FF4500] transition-colors font-medium text-lg"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default VerifyEmail;
