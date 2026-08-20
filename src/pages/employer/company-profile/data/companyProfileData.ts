import { Building2, Users2, Briefcase, Calendar, FileText, Globe } from 'lucide-react';
import type { CompanyDetailItem, CompletionStepItem } from '../types/companyProfile';

export const COMPANY_TABS = [
  'Company Information',
  'Team Members',
  'Hiring Preferences',
  'Social & Links',
  'Verification'
];

export const COMPANY_DETAILS: CompanyDetailItem[] = [
  { label: 'Industry', value: 'Accounting / Financial Services', icon: Building2 },
  { label: 'Company Size', value: '11-50 Employees', icon: Users2 },
  { label: 'Company Type', value: 'Private Partnership Firm', icon: Briefcase },
  { label: 'Year of Establishment', value: '2015', icon: Calendar },
  { label: 'PAN Number', value: 'AAAFM1234A', icon: FileText },
  { label: 'Registration Number', value: '1234567890', icon: FileText },
  { label: 'GST Number', value: '27AAAFM1234A1Z5', icon: FileText },
  { label: 'Website', value: 'www.msassociates.com', icon: Globe, link: true },
];

export const COMPLETION_STEPS: CompletionStepItem[] = [
  { label: 'Basic Information', status: 'Completed', type: 'done' },
  { label: 'Company Description', status: 'Completed', type: 'done' },
  { label: 'Company Logo', status: 'Completed', type: 'done' },
  { label: 'Company Address', status: 'Completed', type: 'done' },
  { label: 'Team Members', status: 'Completed', type: 'done' },
  { label: 'Social Links', status: 'Add New', type: 'add' },
  { label: 'Company Banner', status: 'Add New', type: 'add' },
  { label: 'Verification', status: 'Verify Now', type: 'verify' },
];
