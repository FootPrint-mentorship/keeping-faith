import { GenericApiResponse } from ".";
import { UserRole } from "./auth.types";

export interface OtherUserData {
  _id: string;
  first_name: string;
  last_name: string;
  role: UserRole;
  createdAt: string;

  // TODO REMIND BACKEND
  isActive?: boolean;
}
export interface GetAllUsers extends GenericApiResponse {
  data: {
    users: OtherUserData[];
    total: number;
  };
}

export interface AddUserReq {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  password: string;
  role: UserRole;
}

export interface GetUserQuery {
  page: number;
  limit: number;
  searchQuery?: string;
}
