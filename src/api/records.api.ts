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

interface URecord {
  data: PostRecordInterface;
  id: string;
}

export const UpdateRecord = ({ data, id }: URecord) =>
  baseApi.post<GetSingleRecordRes>(`/records/${id}`, data);

export const GetRecordById = (id: string) =>
  baseApi.get<GetSingleRecordRes>(`/records/${id}`);

// RECORD/REQUESTS
export const GetAllRecordRequests = (query: GetRecordsQuery) =>
  baseApi.get<GetRecordsResponse>("/updaterequest/fecthall", query);

export const CreateContent = (data: PostRecordInterface) =>
  baseApi.post<GetSingleRecordRes>("/updaterequest/createcontent", data);

export const ApproveRecord = (id: string) =>
  baseApi.post<GetSingleRecordRes>(`/updaterequest/approve/${id}/users`);

export const DeleteRecord = (id: string) =>
  baseApi.delete<GetSingleRecordRes>(`/updaterequest/reject/${id}`);
