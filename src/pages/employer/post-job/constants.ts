import type { JobStepItem } from './types';

export const JOB_STEPS: Omit<JobStepItem, 'active'>[] = [
  { step: 1, label: 'Job Details' },
  { step: 2, label: 'Salary & Benefits' },
  { step: 3, label: 'Skills & Requirements' },
  { step: 4, label: 'Additional Information' },
  { step: 5, label: 'Review & Publish' },
];

export const EMPLOYMENT_TYPES = [
  'Full Time',
  'Part Time',
  'Contract',
  'Internship',
];

export const DEPARTMENT_OPTIONS = [
  'Select Department',
  'Accounting & Finance',
  'Audit & Tax',
  'Compliance',
  'Human Resources',
  'Operations',
  'Management',
];

export const JOB_ROLE_OPTIONS = [
  'Select Job Role',
  'Senior Accountant',
  'Junior Accountant',
  'Audit Manager',
  'Tax Consultant',
  'Financial Analyst',
  'Accounts Executive',
  'GST & Tax Accountant',
  'Chartered Accountant (CA)',
];

export const EXPERIENCE_OPTIONS = [
  'Select Experience',
  'Freshers (0 Yrs)',
  '0 - 1 Years',
  '1 - 3 Years',
  '3 - 5 Years',
  '4 - 6 Years',
  '5+ Years',
];

export const NOTICE_PERIOD_OPTIONS = [
  'Select Notice Period',
  'Immediate Joiner',
  '15 Days or less',
  '1 Month',
  '2 Months',
  '3 Months',
];

export const POPULAR_BENEFITS = [
  'Health Insurance',
  'Paid Time Off (PTO)',
  'Flexible Work Hours',
  'Performance Bonus',
  'EPF / Provident Fund',
  'Annual Appraisal Bonus',
  'Work From Home Allowance',
  'Gratuity',
  'Transport Allowance',
  'Skill Learning Support',
];

export const POPULAR_SKILLS = [
  'Tally Prime',
  'GST Return Filing',
  'Income Tax Filing',
  'Advanced Excel',
  'TDS Compliance',
  'Financial Auditing',
  'Balance Sheet Finalization',
  'QuickBooks',
  'SAP FICO',
  'MIS Reporting',
  'Payroll Management',
  'Bank Reconciliation',
  'Statutory Audit',
];

export const QUALIFICATION_OPTIONS = [
  'B.Com',
  'M.Com',
  'CA (Chartered Accountant)',
  'CA Inter',
  'CS (Company Secretary)',
  'CMA / ICWA',
  'MBA Finance',
  'BBA Finance',
  'CFA',
];

export const EDUCATION_LEVEL_OPTIONS = [
  'Select Minimum Education',
  "Graduate / Bachelor's Degree",
  "Post Graduate / Master's Degree",
  'Doctorate / PhD',
  'Professional Certification (CA/CS/CMA)',
  'Diploma / Vocational',
];

export const SUGGESTED_SCREENING_QUESTIONS = [
  'Do you have hands-on experience in filing GST returns?',
  'Are you proficient in using Tally Prime or Zoho Books?',
  'What is your current notice period?',
  'Are you open to working in the office location specified?',
  'What is your expected salary (CTC) per annum?',
  'Do you have experience in handling statutory audits?',
];

export const HIRING_TIMELINE_OPTIONS = [
  'Select Hiring Timeline',
  'Urgent (Immediate Joiner)',
  'Within 15 Days',
  'Within 30 Days',
  'Flexible / Standard',
];


