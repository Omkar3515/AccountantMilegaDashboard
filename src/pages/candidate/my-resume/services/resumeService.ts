import api from "../../../../utils/api"; // adjust to your actual axios instance path
import type { ResumeSummary } from "../types";

interface ResumeApiResponse {
  success: boolean;
  data?: ResumeSummary | Partial<ResumeSummary>;
  message?: string;
}

export const getResumeSummary = async (): Promise<ResumeApiResponse> => {
  try {
    const response = await api.get("/candidate/resume");
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error?.response?.data?.message || error.message,
    };
  }
};

export const uploadResume = async (file: File): Promise<ResumeApiResponse> => {
  try {
    const formData = new FormData();
    formData.append("resume", file);

    const response = await api.post("/candidate/resume/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error?.response?.data?.message || error.message,
    };
  }
};

export const deleteResume = async (): Promise<ResumeApiResponse> => {
  try {
    const response = await api.delete("/candidate/resume");
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error?.response?.data?.message || error.message,
    };
  }
};

export const toggleVisibility = async (isPublic: boolean): Promise<ResumeApiResponse> => {
  try {
    const response = await api.patch("/candidate/resume/visibility", { isPublic });
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error?.response?.data?.message || error.message,
    };
  }
};