import React from 'react';
import {
  ChevronDown,
  MapPin,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link2,
  Minus,
  Plus,
} from 'lucide-react';
import type { JobFormData, JobFieldErrors } from '../types';
import {
  EMPLOYMENT_TYPES,
  DEPARTMENT_OPTIONS,
  JOB_ROLE_OPTIONS,
  EXPERIENCE_OPTIONS,
  NOTICE_PERIOD_OPTIONS,
} from '../constants';

interface JobDetailsProps {
  formData: JobFormData;
  errors?: JobFieldErrors;
  onChange: <K extends keyof JobFormData>(field: K, value: JobFormData[K]) => void;
  onIncrementOpenings: () => void;
  onDecrementOpenings: () => void;
  onNext?: () => void;
}

const JobDetails: React.FC<JobDetailsProps> = ({
  formData,
  errors,
  onChange,
  onIncrementOpenings,
  onDecrementOpenings,
  onNext,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900">Job Details</h3>
        <p className="text-sm text-gray-500">
          Provide basic information about the job opening.
        </p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Job Title */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Job Title <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.title}
                onChange={(e) => onChange('title', e.target.value)}
                placeholder="e.g. Senior Accountant"
                maxLength={100}
                className={`w-full border ${
                  errors?.title ? 'border-red-500' : 'border-gray-200'
                } rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all`}
              />
              <span className="absolute right-3 top-3 text-xs text-gray-400">
                {formData.title.length}/100
              </span>
            </div>
            {errors?.title && (
              <p className="text-xs text-red-500 mt-1">{errors.title}</p>
            )}
          </div>

          {/* Job Role */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Job Role / Designation <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                value={formData.role}
                onChange={(e) => onChange('role', e.target.value)}
                className={`w-full border ${
                  errors?.role ? 'border-red-500' : 'border-gray-200'
                } rounded-lg px-4 py-2.5 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green bg-white text-gray-500 cursor-pointer`}
              >
                {JOB_ROLE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-4 top-3 pointer-events-none" />
            </div>
            {errors?.role && (
              <p className="text-xs text-red-500 mt-1">{errors.role}</p>
            )}
          </div>

          {/* Department */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Department
            </label>
            <div className="relative">
              <select
                value={formData.department}
                onChange={(e) => onChange('department', e.target.value)}
                className={`w-full border ${
                  errors?.department ? 'border-red-500' : 'border-gray-200'
                } rounded-lg px-4 py-2.5 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green bg-white text-gray-500 cursor-pointer`}
              >
                {DEPARTMENT_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-4 top-3 pointer-events-none" />
            </div>
            {errors?.department && (
              <p className="text-xs text-red-500 mt-1">{errors.department}</p>
            )}
          </div>

          {/* Employment Type */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Employment Type <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-wrap items-center gap-4 h-[42px]">
              {EMPLOYMENT_TYPES.map((type) => {
                const isSelected = formData.employmentType === type;
                return (
                  <label
                    key={type}
                    onClick={() => onChange('employmentType', type)}
                    className="flex items-center gap-2 cursor-pointer group"
                  >
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        isSelected
                          ? 'border-brand-green'
                          : 'border-gray-300 group-hover:border-brand-green'
                      }`}
                    >
                      {isSelected && (
                        <div className="w-2 h-2 rounded-full bg-brand-green"></div>
                      )}
                    </div>
                    <span className="text-sm text-gray-700">{type}</span>
                  </label>
                );
              })}
            </div>
            {errors?.employmentType && (
              <p className="text-xs text-red-500 mt-1">{errors.employmentType}</p>
            )}
          </div>

          {/* Experience Required */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Experience Required <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                value={formData.experience}
                onChange={(e) => onChange('experience', e.target.value)}
                className={`w-full border ${
                  errors?.experience ? 'border-red-500' : 'border-gray-200'
                } rounded-lg px-4 py-2.5 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green bg-white text-gray-500 cursor-pointer`}
              >
                {EXPERIENCE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-4 top-3 pointer-events-none" />
            </div>
            {errors?.experience && (
              <p className="text-xs text-red-500 mt-1">{errors.experience}</p>
            )}
          </div>

          {/* Notice Period */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Notice Period <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                value={formData.noticePeriod}
                onChange={(e) => onChange('noticePeriod', e.target.value)}
                className={`w-full border ${
                  errors?.noticePeriod ? 'border-red-500' : 'border-gray-200'
                } rounded-lg px-4 py-2.5 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green bg-white text-gray-500 cursor-pointer`}
              >
                {NOTICE_PERIOD_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-4 top-3 pointer-events-none" />
            </div>
            {errors?.noticePeriod && (
              <p className="text-xs text-red-500 mt-1">{errors.noticePeriod}</p>
            )}
          </div>

          {/* Number of Openings */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Number of Openings <span className="text-red-500">*</span>
            </label>
            <div className={`flex items-center w-full border ${
              errors?.openings ? 'border-red-500' : 'border-gray-200'
            } rounded-lg overflow-hidden h-[42px]`}>
              <button
                type="button"
                onClick={onDecrementOpenings}
                className="px-4 text-gray-500 hover:bg-gray-50 h-full border-r border-gray-200 transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <input
                type="text"
                value={formData.openings}
                readOnly
                className="flex-1 text-center text-sm font-medium focus:outline-none"
              />
              <button
                type="button"
                onClick={onIncrementOpenings}
                className="px-4 text-gray-500 hover:bg-gray-50 h-full border-l border-gray-200 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            {errors?.openings && (
              <p className="text-xs text-red-500 mt-1">{errors.openings}</p>
            )}
          </div>

          {/* Job Location */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Job Location <span className="text-red-500">*</span>
            </label>
            <div className="relative mb-2">
              <input
                type="text"
                value={formData.location}
                onChange={(e) => onChange('location', e.target.value)}
                placeholder="Enter city or select location"
                className={`w-full border ${
                  errors?.location ? 'border-red-500' : 'border-gray-200'
                } rounded-lg pl-4 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all`}
              />
              <MapPin className="w-4 h-4 text-gray-400 absolute right-4 top-3 pointer-events-none" />
            </div>
            {errors?.location && (
              <p className="text-xs text-red-500 mt-1 mb-1">{errors.location}</p>
            )}
            <label
              onClick={() => onChange('isWorkFromHome', !formData.isWorkFromHome)}
              className="flex items-center gap-2 cursor-pointer"
            >
              <div
                className={`w-4 h-4 rounded border flex items-center justify-center ${
                  formData.isWorkFromHome
                    ? 'border-brand-green bg-brand-green text-white'
                    : 'border-gray-300'
                }`}
              >
                {formData.isWorkFromHome && (
                  <span className="text-[10px] font-bold">✓</span>
                )}
              </div>
              <span className="text-sm text-gray-600">Work From Home</span>
            </label>
          </div>
        </div>

        {/* Job Description */}
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-2">
            Job Description <span className="text-red-500">*</span>
          </label>
          <div className={`border ${
            errors?.description ? 'border-red-500' : 'border-gray-200'
          } rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-brand-green/20 focus-within:border-brand-green transition-all`}>
            {/* Toolbar */}
            <div className="flex items-center gap-1 p-2 border-b border-gray-200 bg-gray-50 flex-wrap">
              <select className="text-sm bg-transparent border-none focus:outline-none text-gray-700 mr-2 cursor-pointer">
                <option>Normal</option>
              </select>
              <div className="w-px h-4 bg-gray-300 mx-1"></div>
              <button type="button" className="p-1.5 text-gray-600 hover:bg-gray-200 rounded">
                <Bold className="w-4 h-4" />
              </button>
              <button type="button" className="p-1.5 text-gray-600 hover:bg-gray-200 rounded">
                <Italic className="w-4 h-4" />
              </button>
              <button type="button" className="p-1.5 text-gray-600 hover:bg-gray-200 rounded">
                <Underline className="w-4 h-4" />
              </button>
              <div className="w-px h-4 bg-gray-300 mx-1"></div>
              <button type="button" className="p-1.5 text-gray-600 hover:bg-gray-200 rounded">
                <List className="w-4 h-4" />
              </button>
              <button type="button" className="p-1.5 text-gray-600 hover:bg-gray-200 rounded">
                <ListOrdered className="w-4 h-4" />
              </button>
              <div className="w-px h-4 bg-gray-300 mx-1"></div>
              <button type="button" className="p-1.5 text-gray-600 hover:bg-gray-200 rounded">
                <AlignLeft className="w-4 h-4" />
              </button>
              <button type="button" className="p-1.5 text-gray-600 hover:bg-gray-200 rounded">
                <AlignCenter className="w-4 h-4" />
              </button>
              <button type="button" className="p-1.5 text-gray-600 hover:bg-gray-200 rounded">
                <AlignRight className="w-4 h-4" />
              </button>
              <div className="w-px h-4 bg-gray-300 mx-1"></div>
              <button type="button" className="p-1.5 text-gray-600 hover:bg-gray-200 rounded">
                <Link2 className="w-4 h-4" />
              </button>
            </div>
            {/* Textarea */}
            <div className="relative">
              <textarea
                value={formData.description}
                onChange={(e) => onChange('description', e.target.value)}
                placeholder="Write a detailed description about the role, responsibilities and expectations..."
                maxLength={5000}
                className="w-full h-32 p-4 text-sm focus:outline-none resize-y"
              ></textarea>
              <span className="absolute right-3 bottom-3 text-xs text-gray-400">
                {formData.description.length}/5000
              </span>
            </div>
          </div>
          {errors?.description && (
            <p className="text-xs text-red-500 mt-1">{errors.description}</p>
          )}
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="button"
            onClick={onNext}
            className="px-6 py-2.5 bg-brand-green text-white rounded-lg font-bold hover:bg-brand-green/90 shadow-sm shadow-brand-green/20 transition-all"
          >
            Save & Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;