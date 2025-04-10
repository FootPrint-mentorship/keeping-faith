import { useMutation } from '@tanstack/react-query';
import { authService, LoginCredentials, ForgotPasswordData, ResetPasswordData, SignupData } from '@/services/authService';
import { useRouter } from 'next/router';

export const useAuth = () => {
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) => authService.login(credentials),
    onSuccess: (data) => {
      console.log(data);
      if (data.access) {
        if (data.keepSignedIn) {
          localStorage.setItem('token', data.access);
        } else {
          sessionStorage.setItem('token', data.access);
        }
        router.push('/user/user');
      }
    },
  });

  const signupMutation = useMutation({
    mutationFn: (data: SignupData) => authService.signup(data),
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: (data: ForgotPasswordData) => authService.forgotPassword(data),
    onSuccess: () => {
      router.push('/passwordReset');
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: (data: ResetPasswordData) => authService.resetPassword(data),
  });

  return {
    login: loginMutation,
    signup: signupMutation,
    forgotPassword: forgotPasswordMutation,
    resetPassword: resetPasswordMutation,
  };
};
