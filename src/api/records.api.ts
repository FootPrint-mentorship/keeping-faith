import { GetRecordsQuery, GetRecordsResponse } from "@/types/api/records.types";
import baseApi from "./base.api";

export const GetRecords = (query: GetRecordsQuery) =>
  baseApi.get<GetRecordsResponse>("/records", query);
