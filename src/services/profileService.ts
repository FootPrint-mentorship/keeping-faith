import axios from 'axios';

const API_BASE_URL = 'https://keeping-faith-api.onrender.com/api/v1';

export interface UserProfile {
  fullName: string;
  username: string;
  emailAddress: string;
  address: string;
  dateJoined: string;
  gender: string;
}

export const profileService = {
  getProfile: async (): Promise<UserProfile> => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    
    if (!token) {
      throw new Error('No authentication token found');
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Map API response to match the existing UI structure
      const data = response.data;
      return {
        fullName: `${data.first_name} ${data.last_name}`,
        username: `${data.first_name} ${data.last_name}`,
        emailAddress: data.email,
        address: data.address || '',
        dateJoined: new Date(data.created_at).toLocaleDateString(),
        gender: data.gender || ''
      };
    } catch (error: any) {
      if (error.response?.status === 401) {
        throw new Error('Session expired. Please login again.');
      }
      throw new Error(error.response?.data?.message || 'Failed to fetch profile');
    }
  }
};
