import { GetAllUsers } from "@/types/api/superadmin.types";
import baseApi from "./base.api";

export const getAllUsers = () =>
  baseApi.get<GetAllUsers>("/superadmin/allusers");
