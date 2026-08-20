export interface PublicCompanyInfo {
  companyName?: string;
  logoUrl?: string;
  location?: string;
  industry?: string;
}

export interface PublicJob {
  id: string;
  title: string;
  role?: string;
  department?: string;
  employmentType?: string;
  experience?: string;
  location?: string;
  isWorkFromHome?: boolean;
  description?: string;
  salaryType?: 'lpa' | 'amount' | 'negotiable';
  salaryMin?: string;
  salaryMax?: string;
  salaryPeriod?: 'per_annum' | 'per_month';
  skills?: string[];
  educationLevel?: string;
  createdAt: string;
  views: number;
  companyProfileId?: PublicCompanyInfo; // populated by backend
}

export interface FindJobsFilters {
  search: string;
  location: string;
  employmentType: string; // '' = All Job Types
}