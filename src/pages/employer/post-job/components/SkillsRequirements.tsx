import React, { useState } from 'react';
import { Wrench, Plus, X, Sparkles, Check, GraduationCap, FileText } from 'lucide-react';
import type { JobFormData, JobFieldErrors } from '../types';
import {
  POPULAR_SKILLS,
  QUALIFICATION_OPTIONS,
  EDUCATION_LEVEL_OPTIONS,
} from '../constants';

interface SkillsRequirementsProps {
  formData: JobFormData;
  errors?: JobFieldErrors;
  onChange: <K extends keyof JobFormData>(field: K, value: JobFormData[K]) => void;
  onNext?: () => void;
  onPrev?: () => void;
}

const SkillsRequirements: React.FC<SkillsRequirementsProps> = ({
  formData,
  errors,
  onChange,
  onNext,
  onPrev,
}) => {
  const [customSkillInput, setCustomSkillInput] = useState('');

  const currentSkills = formData.skills || [];
  const currentQualifications = formData.qualifications || [];

  const handleAddCustomSkill = () => {
    const trimmed = customSkillInput.trim();
    if (trimmed && !currentSkills.includes(trimmed)) {
      onChange('skills', [...currentSkills, trimmed]);
      setCustomSkillInput('');
    }
  };

  const handleToggleSkill = (skill: string) => {
    if (currentSkills.includes(skill)) {
      onChange(
        'skills',
        currentSkills.filter((s) => s !== skill)
      );
    } else {
      onChange('skills', [...currentSkills, skill]);
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    onChange(
      'skills',
      currentSkills.filter((s) => s !== skillToRemove)
    );
  };

  const handleKeyDownCustomSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddCustomSkill();
    }
  };

  const handleToggleQualification = (qual: string) => {
    if (currentQualifications.includes(qual)) {
      onChange(
        'qualifications',
        currentQualifications.filter((q) => q !== qual)
      );
    } else {
      onChange('qualifications', [...currentQualifications, qual]);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 space-y-8">
      {/* Header */}
      <div>
        <h3 className="text-lg font-bold text-gray-900">Skills & Requirements</h3>
        <p className="text-sm text-gray-500 mt-1">
          Specify technical skills required for the job role, education criteria, and specific qualifications.
        </p>
      </div>

      {/* Required Skills Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
            <Wrench className="w-4 h-4 text-brand-green" />
            Required Job Skills <span className="text-red-500">*</span>
          </h4>
          <span className="text-xs text-gray-400">Add mandatory & key skills</span>
        </div>

        {/* Popular Skills Quick Select */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-2.5 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Recommended Skills for Accounting & Finance:
          </label>
          <div className="flex flex-wrap gap-2">
            {POPULAR_SKILLS.map((skill) => {
              const isSelected = currentSkills.includes(skill);
              return (
                <button
                  key={skill}
                  type="button"
                  onClick={() => handleToggleSkill(skill)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    isSelected
                      ? 'bg-brand-green text-white shadow-sm'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {isSelected ? (
                    <Check className="w-3 h-3 stroke-[3]" />
                  ) : (
                    <Plus className="w-3 h-3" />
                  )}
                  {skill}
                </button>
              );
            })}
          </div>
        </div>

        {/* Custom Skill Input */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">
            Add Custom Skill
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={customSkillInput}
              onChange={(e) => setCustomSkillInput(e.target.value)}
              onKeyDown={handleKeyDownCustomSkill}
              placeholder="e.g. Statutory Audit, Zoho Books, SAP FICO"
              className="flex-1 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green"
            />
            <button
              type="button"
              onClick={handleAddCustomSkill}
              className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors flex items-center gap-1"
            >
              <Plus className="w-4 h-4" /> Add Skill
            </button>
          </div>
        </div>

        {/* Selected Skills Chips */}
        {currentSkills.length > 0 && (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
            <span className="block text-xs font-bold text-gray-700 mb-2">
              Required Skills Added ({currentSkills.length}):
            </span>
            <div className="flex flex-wrap gap-2">
              {currentSkills.map((sk) => (
                <span
                  key={sk}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-brand-green/30 text-brand-green text-xs font-semibold rounded-lg shadow-2xs"
                >
                  {sk}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(sk)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        {errors?.skills && (
          <p className="mt-1 text-xs text-red-500 font-medium">{errors.skills}</p>
        )}
      </div>

      <hr className="border-gray-100" />

      {/* Education & Qualifications Section */}
      <div className="space-y-6">
        <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-brand-green" />
          Education & Qualifications
        </h4>

        {/* Minimum Education Level */}
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-2">
            Minimum Education Level Required <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.educationLevel || 'Select Minimum Education'}
            onChange={(e) => onChange('educationLevel', e.target.value)}
            className={`w-full border rounded-lg px-4 py-2.5 text-sm bg-white text-gray-800 focus:outline-none focus:ring-2 cursor-pointer ${
              errors?.educationLevel
                ? 'border-red-500 focus:ring-red-200'
                : 'border-gray-200 focus:ring-brand-green/20 focus:border-brand-green'
            }`}
          >
            {EDUCATION_LEVEL_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {errors?.educationLevel && (
            <p className="mt-1 text-xs text-red-500 font-medium">{errors.educationLevel}</p>
          )}
        </div>

        {/* Qualification Chips */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-2">
            Preferred Degrees / Professional Credentials:
          </label>
          <div className="flex flex-wrap gap-2">
            {QUALIFICATION_OPTIONS.map((qual) => {
              const isSelected = currentQualifications.includes(qual);
              return (
                <button
                  key={qual}
                  type="button"
                  onClick={() => handleToggleQualification(qual)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                    isSelected
                      ? 'bg-brand-green/10 border-brand-green text-brand-green font-bold'
                      : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 text-brand-green" />}
                  {qual}
                </button>
              );
            })}
          </div>
        </div>

        {/* Detailed Skills & Requirements Textarea */}
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
            <FileText className="w-4 h-4 text-gray-400" />
            Detailed Candidate Requirements
          </label>
          <p className="text-xs text-gray-500 mb-2">
            Add specific technical expectations, years of hands-on software experience, or soft skills needed.
          </p>
          <textarea
            value={formData.skillsDescription || ''}
            onChange={(e) => onChange('skillsDescription', e.target.value)}
            placeholder="e.g. Candidate should possess in-depth knowledge of GST reconciliation, must have handled monthly TDS filing, and have strong command over Tally Prime and MS Excel VLOOKUP/Pivot tables..."
            rows={4}
            className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all"
          ></textarea>
        </div>
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

export default SkillsRequirements;
