export type SalaryType = 'lpa' | 'amount' | 'negotiable';
export type SalaryPeriod = 'per_annum' | 'per_month';

export interface JobFormData {
  id?: string;
  // Step 1: Job Details
  title: string;
  role: string;
  department: string;
  employmentType: string;
  experience: string;
  noticePeriod: string;
  openings: number;
  location: string;
  isWorkFromHome: boolean;
  description: string;

  // Step 2: Salary & Benefits
  salaryType: SalaryType;
  salaryMin?: string;
  salaryMax?: string;
  salaryPeriod?: SalaryPeriod;
  salaryCurrency?: string;
  benefits?: string[];
  benefitsDescription?: string;

  // Step 3: Skills & Requirements
  skills?: string[];
  qualifications?: string[];
  educationLevel?: string;
  skillsDescription?: string;

  // Step 4: Additional Information
  screeningQuestions?: string[];
  hiringTimeline?: string;
  preferredGender?: string;
  candidateInstructions?: string;
  additionalInfo?: string;

  // Status & Meta
  status?: 'draft' | 'pending_approval' | 'published';
  createdAt?: string;
}

export interface JobStepItem {
  step: number;
  label: string;
  active: boolean;
  completed?: boolean;
}

export type JobFieldErrors = Record<string, string>;

