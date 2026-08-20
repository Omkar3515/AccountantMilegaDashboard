import api from "../../../../utils/api";
import type { JobFormData } from "../types";

interface JobApiResponse {
  success: boolean;
  data?: JobFormData;
  message?: string;
}

interface JobListApiResponse {
  success: boolean;
  data?: JobFormData[];
  message?: string;
}

// Backend (MongoDB/Mongoose) always returns "_id", but our frontend
// JobFormData type uses "id". Without this mapping, formData.id stays
// undefined even after fetching/saving a real job — which silently
// breaks edit mode (isEditMode check fails, and Save/Publish ends up
// calling createJob() instead of updateJob(), creating a duplicate).
const normalizeJob = (job: any): JobFormData => {
  if (!job) return job;
  const { _id, ...rest } = job;
  return { id: _id, ...rest };
};

// @desc    Create/submit a job (goes to pending_approval or published,
//          depending on backend AUTO_APPROVE_JOBS flag)
export const createJob = async (data: JobFormData): Promise<JobApiResponse> => {
  try {
    const response = await api.post("/employer/jobs", data);
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

// @desc    Save a job as draft — if data.id is present, updates the
//          existing draft instead of creating a new one
export const saveJobDraft = async (data: JobFormData): Promise<JobApiResponse> => {
  try {
    const response = await api.post("/employer/jobs/draft", data);
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

// @desc    Get a single job by ID
export const getJobById = async (id: string): Promise<JobFormData | null> => {
  try {
    const response = await api.get(`/employer/jobs/${id}`);
    const job = response.data?.data;
    return job ? normalizeJob(job) : null;
  } catch (error) {
    console.error("Get Job Error:", error);
    return null;
  }
};

// @desc    Get all jobs posted by the logged-in employer (optionally filtered by status)
export const getMyJobs = async (status?: string): Promise<JobListApiResponse> => {
  try {
    const response = await api.get("/employer/jobs", {
      params: status ? { status } : {},
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

// @desc    Update an existing job
export const updateJob = async (id: string, data: JobFormData): Promise<JobApiResponse> => {
  try {
    const response = await api.put(`/employer/jobs/${id}`, data);
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

// @desc    Submit a draft job for approval (draft -> pending_approval / published)
export const submitJobForApproval = async (id: string): Promise<JobApiResponse> => {
  try {
    const response = await api.patch(`/employer/jobs/${id}/submit`);
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

// @desc    Pause an active (published) job
export const pauseJob = async (id: string): Promise<JobApiResponse> => {
  try {
    const response = await api.patch(`/employer/jobs/${id}/pause`);
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

// @desc    Resume a paused job (back to active/published)
export const resumeJob = async (id: string): Promise<JobApiResponse> => {
  try {
    const response = await api.patch(`/employer/jobs/${id}/resume`);
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

// @desc    Close a published job
export const closeJob = async (id: string): Promise<JobApiResponse> => {
  try {
    const response = await api.patch(`/employer/jobs/${id}/close`);
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

// @desc    Delete a job
export const deleteJob = async (id: string): Promise<JobApiResponse> => {
  try {
    const response = await api.delete(`/employer/jobs/${id}`);
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error?.response?.data?.message || error.message,
    };
  }
};