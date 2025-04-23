import { GenericApiResponse } from ".";
import { UserData } from "./auth.types";

interface ProfileData {
  _id: string;
  user: UserData;
  username: string;
  gender: "male" | "female";
  address: string;
  profile_picture: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  __v: number;
}

export interface ProfileResponse extends GenericApiResponse {
  profile: ProfileData;
}

export interface UpdateProfileRequest {
  username: string;
  gender: "male" | "female";
  address: string;
  profile_picture: File;
}
