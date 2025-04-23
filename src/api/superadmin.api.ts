import {
  AddUserReq,
  GetAllUsers,
  GetUserQuery,
} from "@/types/api/superadmin.types";
import baseApi from "./base.api";
import { GenericApiResponse } from "@/types/api";

export const getAllUsers = (query: GetUserQuery) =>
  baseApi.get<GetAllUsers>("/superadmin/allusers", query);

export const addUser = (data: AddUserReq) =>
  baseApi.post<GenericApiResponse>("/superadmin/users", data);

export const deleteUser = (id: string) =>
  baseApi.delete<GenericApiResponse>(`/superadmin/users/${id}`);

export const suspendUser = (id: string) =>
  baseApi.patch<GenericApiResponse>(`/superadmin/suspend/${id}`);

export const unSuspendUser = (id: string) =>
  baseApi.patch<GenericApiResponse>(`/superadmin/unsuspend/${id}`);

/**
 * @description This only demotes a user.. contact backend for full implementation of possibly upgrading a user.
 */
export const updateUser = (id: string) =>
  baseApi.patch<GenericApiResponse>(`/superadmin/unsuspend/${id}`);
