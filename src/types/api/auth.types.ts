import { GenericApiResponse } from ".";

export interface RegisterRequest {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  password: string;
}

export interface RegisterResponse extends GenericApiResponse {
  user: AuthUserData;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UserData {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
}

export type UserRole = "regular" | "superadmin";
interface AuthUserData extends UserData {
  password: string;
  verified: boolean;
  suspended: boolean;
  role: UserRole;
  resetCode: string | null;
  resetCodeExpires: string | Date | null;
  createdAt: string | Date;
  updatedAt: string | Date;
  __v: number;
}

export interface LoginResponse extends GenericApiResponse {
  user: AuthUserData;
  access: string;
  refresh: string;
}

export interface ResetPasswordRequest {
  code: string;
  newPassword: string;
  confirmPassword: string;
}
