import React, { useState } from 'react';
import {
  HelpCircle,
  Plus,
  X,
  Sparkles,
  Check,
  Clock,
  UserCheck,
  FileQuestion,
} from 'lucide-react';
import type { JobFormData, JobFieldErrors } from '../types';
import {
  SUGGESTED_SCREENING_QUESTIONS,
  HIRING_TIMELINE_OPTIONS,
} from '../constants';

interface AdditionalInformationProps {
  formData: JobFormData;
  errors?: JobFieldErrors;
  onChange: <K extends keyof JobFormData>(field: K, value: JobFormData[K]) => void;
  onNext?: () => void;
  onPrev?: () => void;
}

const AdditionalInformation: React.FC<AdditionalInformationProps> = ({
  formData,
  errors,
  onChange,
  onNext,
  onPrev,
}) => {
  const [customQuestionInput, setCustomQuestionInput] = useState('');

  const currentQuestions = formData.screeningQuestions || [];

  const handleAddQuestion = () => {
    const trimmed = customQuestionInput.trim();
    if (trimmed && !currentQuestions.includes(trimmed)) {
      onChange('screeningQuestions', [...currentQuestions, trimmed]);
      setCustomQuestionInput('');
    }
  };

  const handleToggleQuestion = (q: string) => {
    if (currentQuestions.includes(q)) {
      onChange(
        'screeningQuestions',
        currentQuestions.filter((item) => item !== q)
      );
    } else {
      onChange('screeningQuestions', [...currentQuestions, q]);
    }
  };

  const handleRemoveQuestion = (qToRemove: string) => {
    onChange(
      'screeningQuestions',
      currentQuestions.filter((q) => q !== qToRemove)
    );
  };

  const handleKeyDownQuestion = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddQuestion();
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 space-y-8">
      {/* Header */}
      <div>
        <h3 className="text-lg font-bold text-gray-900">Form 4: Additional Information</h3>
        <p className="text-sm text-gray-500 mt-1">
          Add candidate screening questions, hiring timeline, preferred candidate criteria, and special instructions.
        </p>
      </div>

      {/* Candidate Screening Questions */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-brand-green" />
            Candidate Screening Questions
          </h4>
          <span className="text-xs text-gray-400">Questions candidates will answer</span>
        </div>

        {/* Suggested Screening Questions */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-2.5 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Suggested Screening Questions (Click to add):
          </label>
          <div className="flex flex-wrap gap-2">
            {SUGGESTED_SCREENING_QUESTIONS.map((q) => {
              const isSelected = currentQuestions.includes(q);
              return (
                <button
                  key={q}
                  type="button"
                  onClick={() => handleToggleQuestion(q)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-left transition-all ${
                    isSelected
                      ? 'bg-brand-green text-white shadow-sm'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {isSelected ? (
                    <Check className="w-3 h-3 shrink-0 stroke-[3]" />
                  ) : (
                    <Plus className="w-3 h-3 shrink-0" />
                  )}
                  {q}
                </button>
              );
            })}
          </div>
        </div>

        {/* Custom Question Input */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">
            Add Custom Screening Question
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={customQuestionInput}
              onChange={(e) => setCustomQuestionInput(e.target.value)}
              onKeyDown={handleKeyDownQuestion}
              placeholder="e.g. Do you have experience managing a team of 3+ junior accountants?"
              className="flex-1 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green"
            />
            <button
              type="button"
              onClick={handleAddQuestion}
              className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors flex items-center gap-1 shrink-0"
            >
              <Plus className="w-4 h-4" /> Add Question
            </button>
          </div>
        </div>

        {/* Added Questions List */}
        {currentQuestions.length > 0 && (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-2">
            <span className="block text-xs font-bold text-gray-700 mb-1">
              Screening Questions Added ({currentQuestions.length}):
            </span>
            <div className="space-y-2">
              {currentQuestions.map((q, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-800 shadow-2xs"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-brand-green/10 text-brand-green text-[10px] font-bold flex items-center justify-center shrink-0">
                      Q{idx + 1}
                    </span>
                    {q}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveQuestion(q)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <hr className="border-gray-100" />

      {/* Hiring Timeline & Preferences */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Hiring Timeline */}
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
            <Clock className="w-4 h-4 text-brand-green" />
            Hiring Urgency / Timeline <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.hiringTimeline || 'Select Hiring Timeline'}
            onChange={(e) => onChange('hiringTimeline', e.target.value)}
            className={`w-full border rounded-lg px-4 py-2.5 text-sm bg-white text-gray-800 focus:outline-none focus:ring-2 cursor-pointer ${
              errors?.hiringTimeline
                ? 'border-red-500 focus:ring-red-200'
                : 'border-gray-200 focus:ring-brand-green/20 focus:border-brand-green'
            }`}
          >
            {HIRING_TIMELINE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {errors?.hiringTimeline && (
            <p className="mt-1 text-xs text-red-500 font-medium">{errors.hiringTimeline}</p>
          )}
        </div>

        {/* Preferred Gender */}
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-brand-green" />
            Gender Preference <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-4 h-[42px]">
            {['Any / No Preference', 'Male Only', 'Female Only'].map((g) => {
              const isSelected = formData.preferredGender === g;
              return (
                <label
                  key={g}
                  onClick={() => onChange('preferredGender', g)}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      isSelected
                        ? 'border-brand-green bg-white'
                        : errors?.preferredGender
                        ? 'border-red-500'
                        : 'border-gray-300'
                    }`}
                  >
                    {isSelected && (
                      <div className="w-2 h-2 rounded-full bg-brand-green"></div>
                    )}
                  </div>
                  <span className="text-xs text-gray-700 font-medium">{g}</span>
                </label>
              );
            })}
          </div>
          {errors?.preferredGender && (
            <p className="mt-1 text-xs text-red-500 font-medium">{errors.preferredGender}</p>
          )}
        </div>
      </div>

      {/* Candidate Instructions & Notes */}
      <div>
        <label className="block text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
          <FileQuestion className="w-4 h-4 text-brand-green" />
          Special Candidate Instructions / Interview Notes
        </label>
        <p className="text-xs text-gray-500 mb-2">
          Add any special instructions for applicants (e.g. required documents for interview, walk-in timings, portfolio links).
        </p>
        <textarea
          value={formData.candidateInstructions || formData.additionalInfo || ''}
          onChange={(e) => {
            onChange('candidateInstructions', e.target.value);
            onChange('additionalInfo', e.target.value);
          }}
          placeholder="e.g. Walk-in interviews held Monday to Friday, 11 AM - 3 PM. Candidates must bring copy of updated resume and past 3 months salary slips..."
          rows={4}
          className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all"
        ></textarea>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between pt-4 border-t border-gray-100">
        <button
          type="button"
          onClick={onPrev}
          className="px-6 py-2.5 border border-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all text-sm"
        >
          Back
        </button>
        <button
          type="button"
          onClick={onNext}
          className="px-6 py-2.5 bg-brand-green text-white rounded-lg font-bold hover:bg-brand-green/90 shadow-sm shadow-brand-green/20 transition-all text-sm"
        >
          Save & Continue
        </button>
      </div>
    </div>
  );
};

export default AdditionalInformation;
