import axios from 'axios';

const API_BASE_URL = 'https://keeping-faith-api.onrender.com/api/v1/auth';

export interface LoginCredentials {
  email: string;
  password: string;
  keepSignedIn?: boolean;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  code: string;
  newPassword: string;
  confirmPassword: string;
}

export interface SignupData {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  password: string;
}

export const authService = {
  login: async (credentials: LoginCredentials) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, credentials);
      return response.data;
    } catch (error: any) {
      console.error('Login error details:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error('Failed to login. Please try again later.');
      }
    }
  },

  signup: async (data: SignupData) => {
    const response = await axios.post(`${API_BASE_URL}/register`, data);
    return response.data;
  },

  forgotPassword: async (data: ForgotPasswordData) => {
    const response = await axios.post(`${API_BASE_URL}/forgot-password`, data);
    return response.data;
  },

  resetPassword: async (data: ResetPasswordData) => {
    const response = await axios.post(`${API_BASE_URL}/reset_password`, data);
    return response.data;
  }
};
