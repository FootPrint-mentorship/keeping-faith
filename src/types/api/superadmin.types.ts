import { GenericApiResponse } from ".";
import { UserRole } from "./auth.types";

export interface GetAllUsers extends GenericApiResponse {
  data: {
    users: {
      _id: string;
      first_name: string;
      last_name: string;
      role: UserRole;
      createdAt: string;
    }[];
    total: number;
  };
}
