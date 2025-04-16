import {
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  ResetPasswordRequest,
} from "@/types/api/auth.types";
import baseApi from "./base.api";
import { GenericApiResponse } from "@/types/api";

export const Register = (data: RegisterRequest) =>
  baseApi.post<RegisterResponse>("/auth/register", data);

export const Login = (data: LoginResponse) =>
  baseApi.post<LoginResponse>("/auth/login", data);

export const VerifyEmail = ({ token }: { token: string }) =>
  baseApi.get<GenericApiResponse>(`/auth/verify-email/${token}`);

export const ForgotPassword = (data: { email: string }) =>
  baseApi.post<GenericApiResponse>("/auth/forgot-password", data);

export const ResetPassword = (data: ResetPasswordRequest) =>
  baseApi.post<GenericApiResponse>("/auth/reset-password", data);

export const ResendRestCodePassword = (data: { email: string }) =>
  baseApi.post<GenericApiResponse>("/auth/resend-reset-code", data);
