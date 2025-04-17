import {
  GetRecordsQuery,
  GetRecordsResponse,
  GetSingleRecordRes,
  PostRecordInterface,
} from "@/types/api/records.types";
import baseApi from "./base.api";

export const GetRecords = (query: GetRecordsQuery) =>
  baseApi.get<GetRecordsResponse>("/records", query);

export const PostRecord = (data: PostRecordInterface) =>
  baseApi.post<GetSingleRecordRes>("/records", data);

export const GetRecordById = (id: string) =>
  baseApi.get<GetSingleRecordRes>(`/records/${id}`);
