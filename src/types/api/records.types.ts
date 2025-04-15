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
  category: "videos" | "music" | "books";
  subCategory: string;
  status: "approved" | "pending" | "rejected";
  requestedBy: string;
  approvedBy: string | null;
  createdAt: string | Date;
  updatedAt: string | Date;
  __v: number;
}

export interface GetRecordsResponse extends GenericApiResponse {
  records: Record[];
}
