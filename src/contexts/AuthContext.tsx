import routes from "@/navigation/routes";
import axios from "axios";
import { useRouter } from "next/router";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface Profile {
  username: string;
  address: string;
  gender: string;
  createdAt: string;
  profile_picture: string;
  role?: string;
  email: string;
}

interface LoginProps {
  keepSignedIn: boolean;
  access: string;
}

interface AuthContextType {
  token: string | null;
  getToken: () => string | null;
  login: (props: LoginProps) => Promise<void>;
  signup: any;
  forgotPassword: any;
  resetPassword: any;
  logout: () => void;
  isAuthenticated: boolean;
  profile: Profile | null;
  fetchProfile: () => Promise<void>;
  updateProfile: (data: FormData) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedToken =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      fetchProfile();
    }
  }, []);

  const getToken = (): string | null => {
    return (
      token || localStorage.getItem("token") || sessionStorage.getItem("token")
    );
  };

  const fetchProfile = async () => {
    try {
      const currentToken = getToken();
      if (!currentToken) {
        console.error("No token found");
        return;
      }

      const response = await axios.get(
        "https://keeping-faith-api.onrender.com/api/v1/profile",
        {
          headers: {
            Authorization: `Bearer ${currentToken}`,
          },
        }
      );

      const profileData = {
        ...response.data.profile,
        role: response.data.profile.role || "user",
      };

      setProfile(profileData);
    } catch (error: any) {
      console.error(
        "Error fetching profile:",
        error.response?.data || error.message
      );
      if (error.response?.status === 401) {
        logout();
      }
    }
  };

  const updateProfile = async (formData: FormData) => {
    try {
      const currentToken = getToken();
      if (!currentToken) {
        throw new Error("No token found");
      }

      await axios.put(
        "https://keeping-faith-api.onrender.com/api/v1/profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${currentToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Fetch the updated profile data immediately after successful update
      await fetchProfile();
    } catch (error: any) {
      console.error(
        "Error updating profile:",
        error.response?.data || error.message
      );
      throw error;
    }
  };

  const login = async ({ access, keepSignedIn }: LoginProps) => {
    try {
      // const response = await axios.post('https://keeping-faith-api.onrender.com/api/v1/auth/login', credentials);
      // const { access, keepSignedIn } = response.data;

      if (access) {
        if (keepSignedIn) {
          localStorage.setItem("token", access);
        } else {
          sessionStorage.setItem("token", access);
        }
        setToken(access);
        await fetchProfile();
      }
      // return response.data;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    setToken(null);
    setProfile(null);
    router?.replace(routes.LOGIN_PAGE);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        getToken,
        login,
        signup: () => {},
        forgotPassword: () => {},
        resetPassword: () => {},
        logout,
        isAuthenticated: !!token,
        profile,
        fetchProfile,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
