import { ProfileResponse } from "@/types/api/profile.types";
import baseApi from "./base.api";

export const GetProfile = () => baseApi.get<ProfileResponse>("/profile");

export const UpdateProfile = (data: FormData) =>
  baseApi.put<ProfileResponse>("/profile", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
