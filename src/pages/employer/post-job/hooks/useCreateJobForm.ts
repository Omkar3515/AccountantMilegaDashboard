import { useState } from 'react';
import type { JobFormData, JobFieldErrors } from '../types';
import {
  validateJobDetails,
  validateSalaryBenefits,
  validateSkillsRequirements,
  validateAdditionalInfo,
} from '../validation';
import { createJob, saveJobDraft, updateJob, submitJobForApproval } from '../services/jobService';

const initialJobFormData: JobFormData = {
  title: '',
  role: 'Select Job Role',
  department: 'Select Department',
  employmentType: 'Full Time',
  experience: 'Select Experience',
  noticePeriod: 'Select Notice Period',
  openings: 1,
  location: '',
  isWorkFromHome: false,
  description: '',
  salaryType: 'lpa',
  salaryMin: '',
  salaryMax: '',
  salaryPeriod: 'per_annum',
  salaryCurrency: 'INR',
  benefits: [],
  benefitsDescription: '',
  skills: [],
  qualifications: [],
  educationLevel: 'Select Minimum Education',
  skillsDescription: '',
  hiringTimeline: 'Select Hiring Timeline',
  preferredGender: '',
  status: 'draft',
};

export const useCreateJobForm = (initialData?: Partial<JobFormData>) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<JobFormData>({
    ...initialJobFormData,
    ...initialData,
  });
  const [errors, setErrors] = useState<JobFieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isDrafting, setIsDrafting] = useState<boolean>(false);

  const isEditMode = Boolean(initialData?.id);
  const originalStatus = initialData?.status;

  const updateFormField = <K extends keyof JobFormData>(
    field: K,
    value: JobFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const incrementOpenings = () => {
    setFormData((prev) => ({ ...prev, openings: (prev.openings || 1) + 1 }));
  };

  const decrementOpenings = () => {
    setFormData((prev) => ({
      ...prev,
      openings: Math.max(1, (prev.openings || 1) - 1),
    }));
  };

  const goToStep = (step: number) => {
    if (step < 1 || step > 5) return;

    // Going backwards is always allowed
    if (step < currentStep) {
      setErrors({});
      setCurrentStep(step);
      return;
    }

    // Going forward or jumping to a step: validate preceding steps sequentially
    if (step > 1) {
      const step1Errors = validateJobDetails(formData);
      if (Object.keys(step1Errors).length > 0) {
        setErrors(step1Errors);
        setCurrentStep(1);
        return;
      }
    }

    if (step > 2) {
      const step2Errors = validateSalaryBenefits(formData);
      if (Object.keys(step2Errors).length > 0) {
        setErrors(step2Errors);
        setCurrentStep(2);
        return;
      }
    }

    if (step > 3) {
      const step3Errors = validateSkillsRequirements(formData);
      if (Object.keys(step3Errors).length > 0) {
        setErrors(step3Errors);
        setCurrentStep(3);
        return;
      }
    }

    if (step > 4) {
      const step4Errors = validateAdditionalInfo(formData);
      if (Object.keys(step4Errors).length > 0) {
        setErrors(step4Errors);
        setCurrentStep(4);
        return;
      }
    }

    setErrors({});
    setCurrentStep(step);
  };

  const handleNextStep = () => {
    let stepErrors: JobFieldErrors = {};

    if (currentStep === 1) {
      stepErrors = validateJobDetails(formData);
    } else if (currentStep === 2) {
      stepErrors = validateSalaryBenefits(formData);
    } else if (currentStep === 3) {
      stepErrors = validateSkillsRequirements(formData);
    } else if (currentStep === 4) {
      stepErrors = validateAdditionalInfo(formData);
    }

    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return; // stop here if step has errors
    }

    setErrors({});
    if (currentStep < 5) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setErrors({});
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSaveDraft = async () => {
    setIsDrafting(true);
    try {
      if (isEditMode && formData.id) {
        const res = await updateJob(formData.id, formData);
        if (res.success && res.data) setFormData(res.data);
        return res;
      }

      const updated = { ...formData, status: 'draft' as const };
      const res = await saveJobDraft(updated);
      if (res.success && res.data) setFormData(res.data);
      return res;
    } finally {
      setIsDrafting(false);
    }
  };

  const handlePublishJob = async () => {
    const step1Errors = validateJobDetails(formData);
    if (Object.keys(step1Errors).length > 0) {
      setErrors(step1Errors);
      setCurrentStep(1);
      return { success: false, message: 'Please fill all required fields in Job Details' };
    }

    const step2Errors = validateSalaryBenefits(formData);
    if (Object.keys(step2Errors).length > 0) {
      setErrors(step2Errors);
      setCurrentStep(2);
      return { success: false, message: 'Please fill all required fields in Salary & Benefits' };
    }

    const step3Errors = validateSkillsRequirements(formData);
    if (Object.keys(step3Errors).length > 0) {
      setErrors(step3Errors);
      setCurrentStep(3);
      return { success: false, message: 'Please fill all required fields in Skills & Requirements' };
    }

    const step4Errors = validateAdditionalInfo(formData);
    if (Object.keys(step4Errors).length > 0) {
      setErrors(step4Errors);
      setCurrentStep(4);
      return { success: false, message: 'Please fill all required fields in Additional Information' };
    }

    setIsSubmitting(true);
    try {
      if (isEditMode && formData.id) {
        const updateRes = await updateJob(formData.id, formData);
        if (!updateRes.success) return updateRes;

        if (originalStatus === 'draft' || originalStatus === 'pending_approval') {
          const submitRes = await submitJobForApproval(formData.id);
          if (submitRes.success && submitRes.data) setFormData(submitRes.data);
          return submitRes;
        }

        if (updateRes.data) setFormData(updateRes.data);
        return updateRes;
      }

      const updated = { ...formData, status: 'pending_approval' as const };
      const res = await createJob(updated);
      if (res.success && res.data) setFormData(res.data);
      return res;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    currentStep,
    formData,
    errors,
    isSubmitting,
    isDrafting,
    isEditMode,
    updateFormField,
    incrementOpenings,
    decrementOpenings,
    goToStep,
    handleNextStep,
    handlePrevStep,
    handleSaveDraft,
    handlePublishJob,
  };
};