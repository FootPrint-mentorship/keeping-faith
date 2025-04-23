import { useMutation } from "@tanstack/react-query";
import {
  authService,
  LoginCredentials,
  ForgotPasswordData,
  ResetPasswordData,
  SignupData,
} from "@/services/authService";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export const useAuth = () => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Check for existing token on mount
    const storedToken =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    console.log("Initial token from storage:", storedToken); // Debug log
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) =>
      authService.login(credentials),
    onSuccess: (data) => {
      if (data.access) {
        console.log("Login successful, storing token:", data.access); // Debug log
        // Store token based on keepSignedIn preference
        if (data.keepSignedIn) {
          localStorage.setItem("token", data.access);
        } else {
          sessionStorage.setItem("token", data.access);
        }
        // Update token state
        setToken(data.access);
        router.push("/user/user");
      }
    },
  });

  const signupMutation = useMutation({
    mutationFn: (data: SignupData) => authService.signup(data),
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: (data: ForgotPasswordData) => authService.forgotPassword(data),
  });

  const resetPasswordMutation = useMutation({
    mutationFn: (data: ResetPasswordData) => authService.resetPassword(data),
  });

  const logout = () => {
    // Clear token from storage
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    // Clear token state
    setToken(null);
    // Redirect to login
    router.push("/login");
  };

  // Function to get current token
  const getToken = (): string | null => {
    const currentToken =
      token || localStorage.getItem("token") || sessionStorage.getItem("token");
    console.log("Getting token:", currentToken); // Debug log
    return currentToken;
  };

  return {
    token,
    getToken,
    login: loginMutation,
    signup: signupMutation,
    forgotPassword: forgotPasswordMutation,
    resetPassword: resetPasswordMutation,
    logout,
    isAuthenticated: !!token,
  };
};
