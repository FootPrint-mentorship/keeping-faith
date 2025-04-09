import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();

  if (!isOpen) return null;

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 relative">
        <div className="text-center">
          {/* Success Icon */}
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
            <svg className="h-10 w-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Email Verified Successfully!
          </h2>
          
          <p className="text-gray-600 mb-6">
            Your email has been verified. You can now log in to your account and start using our services.
          </p>

          <div className="flex flex-col gap-3">
            <button
              onClick={handleLogin}
              className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Continue to Login
            </button>
            
            <button
              onClick={onClose}
              className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
