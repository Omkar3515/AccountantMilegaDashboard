export type ApplicationStatus =
  | 'Applied'
  | 'Shortlisted'
  | 'Interview Scheduled'
  | 'Offered'
  | 'Rejected';

export interface ApplicationItem {
  id: string;
  initials: string;
  color: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  appliedDate: string;
  status: ApplicationStatus;
  statusNote: string;
  jobId: string;
}