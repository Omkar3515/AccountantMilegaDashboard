import api from "../../../../utils/api"; // adjust to your actual axios instance path
import type { ApplicationItem, ApplicationStatus } from "../types";

const AVATAR_COLORS = [
  'bg-blue-700 text-white',
  'bg-emerald-50 text-emerald-700 border border-emerald-200',
  'bg-amber-500 text-white',
  'bg-violet-50 text-violet-700 border border-violet-200',
  'bg-rose-500 text-white',
  'bg-teal-500 text-white',
];

const getInitials = (name: string) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('');

const getAvatarColor = (name: string) => {
  const index = name.charCodeAt(0) % AVATAR_COLORS.length;
  return AVATAR_COLORS[index];
};

const formatSalary = (job: any): string => {
  if (!job) return 'Not Disclosed';
  if (job.salaryType === 'negotiable') return 'Best in Industry';
  if (!job.salaryMin && !job.salaryMax) return 'Not Disclosed';

  if (job.salaryType === 'lpa') {
    return `₹${job.salaryMin || '-'} - ${job.salaryMax || '-'} LPA`;
  }
  const min = job.salaryMin ? Number(job.salaryMin).toLocaleString('en-IN') : '-';
  const max = job.salaryMax ? Number(job.salaryMax).toLocaleString('en-IN') : '-';
  const period = job.salaryPeriod === 'per_annum' ? '/ Year' : '/ Month';
  return `₹${min} - ₹${max} ${period}`;
};

// Backend returns nested { jobId: {...}, companyProfileId: {...} } (populated).
// This flattens it into the shape MyApplications.tsx's table expects.
const normalizeApplication = (raw: any): ApplicationItem => {
  const job = raw.jobId || {};
  const company = raw.companyProfileId || {};
  const companyName = company.companyName || 'Company Name Not Available';

  return {
    id: raw._id,
    jobId: job._id || '',
    initials: getInitials(job.title || '?'),
    color: getAvatarColor(job.title || '?'),
    title: job.title || 'Untitled Job',
    company: companyName,
    location: job.isWorkFromHome ? 'Work From Home' : job.location || '-',
    salary: formatSalary(job),
    appliedDate: new Date(raw.createdAt).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }),
    status: raw.status,
    statusNote: raw.statusNote || '',
  };
};

interface ApplyResponse {
  success: boolean;
  message?: string;
}

export const applyToJob = async (jobId: string): Promise<ApplyResponse> => {
  try {
    const response = await api.post("/candidate/applications", { jobId });
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error?.response?.data?.message || error.message,
    };
  }
};

export const getMyApplications = async (
  status?: string
): Promise<{ success: boolean; data?: ApplicationItem[]; message?: string }> => {
  try {
    const response = await api.get("/candidate/applications", {
      params: status && status !== 'All Status' ? { status } : {},
    });
    const rawList = response.data?.data || [];
    return {
      success: true,
      data: rawList.map(normalizeApplication),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.response?.data?.message || error.message,
    };
  }
};

export const checkApplicationStatus = async (
  jobId: string
): Promise<{ hasApplied: boolean; status: ApplicationStatus | null }> => {
  try {
    const response = await api.get(`/candidate/applications/check/${jobId}`);
    return response.data?.data || { hasApplied: false, status: null };
  } catch (error) {
    return { hasApplied: false, status: null };
  }
};

export const withdrawApplication = async (id: string): Promise<ApplyResponse> => {
  try {
    const response = await api.delete(`/candidate/applications/${id}`);
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error?.response?.data?.message || error.message,
    };
  }
};