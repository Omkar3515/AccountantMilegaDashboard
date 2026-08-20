export type JobStatus =
  | 'draft'
  | 'pending_approval'
  | 'published'
  | 'paused'
  | 'rejected'
  | 'closed';

export interface ManagedJob {
  id: string;
  title: string;
  department?: string;
  location?: string;
  employmentType?: string;
  status: JobStatus;
  views: number;
  applicationsCount: number;
  createdAt: string;
  updatedAt: string;
}

// Maps backend status -> what the employer UI shows
export const STATUS_DISPLAY_MAP: Record<JobStatus, string> = {
  draft: 'Draft',
  pending_approval: 'Pending Approval',
  published: 'Active',
  paused: 'Paused',
  rejected: 'Rejected',
  closed: 'Closed',
};

// Colors per displayed status (matches your existing badge styles)
export const STATUS_BADGE_STYLES: Record<JobStatus, string> = {
  draft: 'bg-gray-50 text-gray-600 border border-gray-200',
  pending_approval: 'bg-blue-50 text-blue-700 border border-blue-200',
  published: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  paused: 'bg-amber-50 text-amber-700 border border-amber-200',
  rejected: 'bg-rose-50 text-rose-700 border border-rose-200',
  closed: 'bg-rose-50 text-rose-700 border border-rose-200',
};