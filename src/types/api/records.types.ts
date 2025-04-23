import { GenericApiResponse } from ".";

export interface GetRecordsQuery {
  search: string;
  category: string;
  subCategory: string;
}

interface Record {
  _id: string;
  title: string;
  description: string;
  link: string;
  views: number;
  // category: "videos" | "music" | "books";
category: string;
  subCategory: string;
  status: "approved" | "pending" | "rejected";
  requestedBy: string;
  approvedBy: string | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface GetRecordsResponse extends GenericApiResponse {
  records: Record[];
}

export interface PostRecordInterface {
  title: string;
  description: string;
  link: string;
  category: string;
  subCategory: string;
}

export interface GetSingleRecordRes extends GenericApiResponse {
  record: Record;
}
