import api from "../../../../utils/api"; // adjust to your actual axios instance path
import type { PublicJob } from "../types";

interface FindJobsResponse {
  success: boolean;
  data?: PublicJob[];
  pagination?: {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
  };
  message?: string;
}

interface JobDetailResponse {
  success: boolean;
  data?: PublicJob;
  message?: string;
}

// Backend returns "_id" (MongoDB), frontend PublicJob type uses "id".
// Without this, job.id stays undefined everywhere (same bug we hit on
// the employer side) — breaks keys, "View Details" navigation, etc.
const normalizeJob = (job: any): PublicJob => {
  if (!job) return job;
  const { _id, ...rest } = job;
  return { id: _id, ...rest };
};

export const getPublishedJobs = async (params: {
  search?: string;
  location?: string;
  employmentType?: string;
  experience?: string;
  salaryMin?: number;
  salaryMax?: number;
  skills?: string[];
  page?: number;
  limit?: number;
}): Promise<FindJobsResponse> => {
  try {
    const response = await api.get("/candidate/jobs", {
      params: {
        ...params,
        skills: params.skills?.join(","),
      },
    });
    return {
      ...response.data,
      data: Array.isArray(response.data?.data)
        ? response.data.data.map(normalizeJob)
        : response.data?.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.response?.data?.message || error.message,
    };
  }
};

export const getPublishedJobById = async (id: string): Promise<JobDetailResponse> => {
  try {
    const response = await api.get(`/candidate/jobs/${id}`);
    return {
      ...response.data,
      data: response.data?.data ? normalizeJob(response.data.data) : undefined,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.response?.data?.message || error.message,
    };
  }
};