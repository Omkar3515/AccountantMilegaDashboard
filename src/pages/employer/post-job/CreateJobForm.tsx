import React from 'react';
import DraftButton from './components/DraftButton';
import PublishButton from './components/PublishButton';
import JobStepper from './components/JobStepper';
import JobDetails from './components/JobDetails';
import SalaryBenefits from './components/SalaryBenefits';
import SkillsRequirements from './components/SkillsRequirements';
import AdditionalInformation from './components/AdditionalInformation';
import ReviewPublish from './components/ReviewPublish';
import JobPreview from './components/JobPreview';
import { useCreateJobForm } from './hooks/useCreateJobForm';
import type { JobFormData } from './types';

interface CreateJobFormProps {
  initialData?: Partial<JobFormData>;
  mode?: 'create' | 'edit';
  onSuccess?: (job: JobFormData) => void;
  onCancel?: () => void;
}

const CreateJobForm: React.FC<CreateJobFormProps> = ({
  initialData,
  mode = 'create',
}) => {
  const {
    currentStep,
    formData,
    errors,
    isSubmitting,
    isDrafting,
    updateFormField,
    incrementOpenings,
    decrementOpenings,
    goToStep,
    handleNextStep,
    handlePrevStep,
    handleSaveDraft,
    handlePublishJob,
  } = useCreateJobForm(initialData);

  const isEditMode = mode === 'edit';

  // The LAST step (5) is Review & Publish. Only there should the header
  // button actually submit to the backend. On earlier steps, it should
  // just jump the user to the review/preview step — no backend call,
  // matching what the "Preview Job" label actually promises.
  const isReviewStep = currentStep === 5;

  const handleHeaderButtonClick = () => {
    if (isReviewStep) {
      handlePublishJob();
    } else {
      goToStep(5); // just navigate to Review & Publish, nothing is saved yet
    }
  };

  return (
    <>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-2">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            {isEditMode ? 'Edit Job Posting' : 'Post a New Job'}
          </h2>
          <p className="text-sm text-gray-500">
            Fill in the details to post your job. Once published, your post will be reviewed and published after Admin approval.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <DraftButton onClick={handleSaveDraft} isLoading={isDrafting} />
          <PublishButton
            onClick={handleHeaderButtonClick}
            isLoading={isSubmitting}
            label={isReviewStep ? 'Publish Job' : 'Preview Job'}
          />
        </div>
      </div>

      {/* Stepper */}
      <JobStepper currentStep={currentStep} onStepClick={goToStep} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form Area */}
        <div className="lg:col-span-2">
          {currentStep === 1 && (
            <JobDetails
              formData={formData}
              errors={errors}
              onChange={updateFormField}
              onIncrementOpenings={incrementOpenings}
              onDecrementOpenings={decrementOpenings}
              onNext={handleNextStep}
            />
          )}

          {currentStep === 2 && (
            <SalaryBenefits
              formData={formData}
              errors={errors}
              onChange={updateFormField}
              onNext={handleNextStep}
              onPrev={handlePrevStep}
            />
          )}

          {currentStep === 3 && (
            <SkillsRequirements
              formData={formData}
              errors={errors}
              onChange={updateFormField}
              onNext={handleNextStep}
              onPrev={handlePrevStep}
            />
          )}

          {currentStep === 4 && (
            <AdditionalInformation
              formData={formData}
              errors={errors}
              onChange={updateFormField}
              onNext={handleNextStep}
              onPrev={handlePrevStep}
            />
          )}

          {currentStep === 5 && (
            <ReviewPublish
              formData={formData}
              onEditStep={(step) => goToStep(step)}
              onPublish={handlePublishJob}
              onPrev={handlePrevStep}
              isSubmitting={isSubmitting}
            />
          )}
        </div>

        {/* Right Sidebar - Preview */}
        <JobPreview formData={formData} />
      </div>
    </>
  );
};

export default CreateJobForm;