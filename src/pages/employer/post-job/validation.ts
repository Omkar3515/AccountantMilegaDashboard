import type { JobFormData, JobFieldErrors } from './types';

export const validateJobDetails = (data: JobFormData): JobFieldErrors => {
  const errors: JobFieldErrors = {};

  if (!data.title?.trim()) {
    errors.title = 'Job title is required';
  }
  if (!data.role || data.role === 'Select Job Role') {
    errors.role = 'Job role is required';
  }
  if (!data.department || data.department === 'Select Department') {
    errors.department = 'Department is required';
  }
  if (!data.employmentType) {
    errors.employmentType = 'Employment type is required';
  }
  if (!data.experience || data.experience === 'Select Experience') {
    errors.experience = 'Experience is required';
  }
  if (!data.noticePeriod || data.noticePeriod === 'Select Notice Period') {
    errors.noticePeriod = 'Notice period is required';
  }
  if (!data.openings || data.openings < 1) {
    errors.openings = 'Number of openings must be at least 1';
  }
  if (!data.location?.trim() && !data.isWorkFromHome) {
    errors.location = 'Job location is required';
  }
  if (!data.description?.trim()) {
    errors.description = 'Job description is required';
  }

  return errors;
};

export const validateSalaryBenefits = (data: JobFormData): JobFieldErrors => {
  const errors: JobFieldErrors = {};

  if (!data.salaryType) {
    errors.salaryType = 'Salary structure is required';
  } else if (data.salaryType === 'lpa' || data.salaryType === 'amount') {
    const min = data.salaryMin !== undefined && data.salaryMin !== '' ? parseFloat(data.salaryMin) : NaN;
    const max = data.salaryMax !== undefined && data.salaryMax !== '' ? parseFloat(data.salaryMax) : NaN;

    if (isNaN(min)) {
      errors.salaryMin = 'Minimum salary is required';
    }
    if (isNaN(max)) {
      errors.salaryMax = 'Maximum salary is required';
    }
    if (!isNaN(min) && !isNaN(max) && min > max) {
      errors.salaryMax = 'Maximum salary must be greater than or equal to minimum salary';
    }
  }

  return errors;
};

export const validateSkillsRequirements = (data: JobFormData): JobFieldErrors => {
  const errors: JobFieldErrors = {};

  if (!data.skills || data.skills.length === 0) {
    errors.skills = 'At least one job skill is required';
  }
  if (!data.educationLevel || data.educationLevel === 'Select Minimum Education') {
    errors.educationLevel = 'Minimum education level is required';
  }

  return errors;
};

export const validateAdditionalInfo = (data: JobFormData): JobFieldErrors => {
  const errors: JobFieldErrors = {};

  if (!data.hiringTimeline || data.hiringTimeline === 'Select Hiring Timeline') {
    errors.hiringTimeline = 'Hiring urgency / timeline is required';
  }
  if (!data.preferredGender || !data.preferredGender.trim()) {
    errors.preferredGender = 'Gender preference is required';
  }

  return errors;
};

export const validateJobForm = (data: JobFormData): JobFieldErrors => {
  return {
    ...validateJobDetails(data),
    ...validateSalaryBenefits(data),
    ...validateSkillsRequirements(data),
    ...validateAdditionalInfo(data),
  };
};