import React, { useState } from 'react';
import { IndianRupee, Plus, X, Sparkles, Check, Gift } from 'lucide-react';
import type { JobFormData, SalaryType, SalaryPeriod, JobFieldErrors } from '../types';
import { POPULAR_BENEFITS } from '../constants';

interface SalaryBenefitsProps {
  formData: JobFormData;
  errors?: JobFieldErrors;
  onChange: <K extends keyof JobFormData>(field: K, value: JobFormData[K]) => void;
  onNext?: () => void;
  onPrev?: () => void;
}

const SalaryBenefits: React.FC<SalaryBenefitsProps> = ({
  formData,
  errors,
  onChange,
  onNext,
  onPrev,
}) => {
  const [customBenefitInput, setCustomBenefitInput] = useState('');

  const currentBenefits = formData.benefits || [];
  const salaryType: SalaryType = formData.salaryType || 'lpa';

  const handleAddCustomBenefit = () => {
    const trimmed = customBenefitInput.trim();
    if (trimmed && !currentBenefits.includes(trimmed)) {
      onChange('benefits', [...currentBenefits, trimmed]);
      setCustomBenefitInput('');
    }
  };

  const handleToggleBenefit = (benefit: string) => {
    if (currentBenefits.includes(benefit)) {
      onChange(
        'benefits',
        currentBenefits.filter((b) => b !== benefit)
      );
    } else {
      onChange('benefits', [...currentBenefits, benefit]);
    }
  };

  const handleRemoveBenefit = (benefitToRemove: string) => {
    onChange(
      'benefits',
      currentBenefits.filter((b) => b !== benefitToRemove)
    );
  };

  const handleKeyDownCustomBenefit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddCustomBenefit();
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 space-y-8">
      {/* Header */}
      <div>
        <h3 className="text-lg font-bold text-gray-900">Salary & Benefits</h3>
        <p className="text-sm text-gray-500 mt-1">
          Specify compensation details in LPA or exact amount, and outline additional perks & benefits offered.
        </p>
      </div>

      {/* Salary Configuration Section */}
      <div className="space-y-6">
        <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
          <IndianRupee className="w-4 h-4 text-brand-green" />
          Salary Structure
        </h4>

        {/* Salary Type Selector Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => onChange('salaryType', 'lpa')}
            className={`p-4 rounded-xl border-2 text-left transition-all flex flex-col justify-between ${
              salaryType === 'lpa'
                ? 'border-brand-green bg-brand-green/5 text-gray-900 shadow-sm'
                : 'border-gray-200 hover:border-gray-300 bg-white text-gray-600'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-sm">Salary in LPA</span>
              <div
                className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  salaryType === 'lpa'
                    ? 'border-brand-green bg-brand-green'
                    : 'border-gray-300'
                }`}
              >
                {salaryType === 'lpa' && (
                  <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                )}
              </div>
            </div>
            <p className="text-xs text-gray-500">
              Lakhs Per Annum range (e.g. 4.5 - 7.0 LPA)
            </p>
          </button>

          <button
            type="button"
            onClick={() => onChange('salaryType', 'amount')}
            className={`p-4 rounded-xl border-2 text-left transition-all flex flex-col justify-between ${
              salaryType === 'amount'
                ? 'border-brand-green bg-brand-green/5 text-gray-900 shadow-sm'
                : 'border-gray-200 hover:border-gray-300 bg-white text-gray-600'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-sm">Specific Amount</span>
              <div
                className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  salaryType === 'amount'
                    ? 'border-brand-green bg-brand-green'
                    : 'border-gray-300'
                }`}
              >
                {salaryType === 'amount' && (
                  <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                )}
              </div>
            </div>
            <p className="text-xs text-gray-500">
              Exact fixed amount or custom range (Monthly / Yearly)
            </p>
          </button>

          <button
            type="button"
            onClick={() => onChange('salaryType', 'negotiable')}
            className={`p-4 rounded-xl border-2 text-left transition-all flex flex-col justify-between ${
              salaryType === 'negotiable'
                ? 'border-brand-green bg-brand-green/5 text-gray-900 shadow-sm'
                : 'border-gray-200 hover:border-gray-300 bg-white text-gray-600'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-sm">Negotiable</span>
              <div
                className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  salaryType === 'negotiable'
                    ? 'border-brand-green bg-brand-green'
                    : 'border-gray-300'
                }`}
              >
                {salaryType === 'negotiable' && (
                  <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                )}
              </div>
            </div>
            <p className="text-xs text-gray-500">
              Disclosed during interview / as per company standards
            </p>
          </button>
        </div>

        {/* Dynamic Inputs based on Salary Type */}
        {salaryType === 'lpa' && (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 space-y-4">
            <label className="block text-xs font-bold uppercase text-gray-600 tracking-wider">
              Enter Salary in LPA (Lakhs Per Annum)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-700 font-medium mb-1">
                  Minimum LPA
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    placeholder="e.g. 3.5"
                    value={formData.salaryMin || ''}
                    onChange={(e) => onChange('salaryMin', e.target.value)}
                    className={`w-full border rounded-lg px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 ${
                      errors?.salaryMin
                        ? 'border-red-500 focus:ring-red-200'
                        : 'border-gray-200 focus:ring-brand-green/20 focus:border-brand-green'
                    }`}
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-gray-400 font-semibold">
                    LPA
                  </span>
                </div>
                {errors?.salaryMin && (
                  <p className="mt-1 text-xs text-red-500 font-medium">{errors.salaryMin}</p>
                )}
              </div>

              <div>
                <label className="block text-xs text-gray-700 font-medium mb-1">
                  Maximum LPA
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    placeholder="e.g. 6.0"
                    value={formData.salaryMax || ''}
                    onChange={(e) => onChange('salaryMax', e.target.value)}
                    className={`w-full border rounded-lg px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 ${
                      errors?.salaryMax
                        ? 'border-red-500 focus:ring-red-200'
                        : 'border-gray-200 focus:ring-brand-green/20 focus:border-brand-green'
                    }`}
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-gray-400 font-semibold">
                    LPA
                  </span>
                </div>
                {errors?.salaryMax && (
                  <p className="mt-1 text-xs text-red-500 font-medium">{errors.salaryMax}</p>
                )}
              </div>
            </div>
            <p className="text-xs text-gray-500">
              💡 Candidates will see salary range as:{' '}
              <strong className="text-brand-green">
                ₹{formData.salaryMin || '3.5'} - {formData.salaryMax || '6.0'} LPA
              </strong>
            </p>
          </div>
        )}

        {salaryType === 'amount' && (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold uppercase text-gray-600 tracking-wider">
                Enter Specific Amount Range
              </label>
              <div className="flex items-center gap-2">
                <label className="text-xs text-gray-500">Pay Period:</label>
                <select
                  value={formData.salaryPeriod || 'per_month'}
                  onChange={(e) =>
                    onChange('salaryPeriod', e.target.value as SalaryPeriod)
                  }
                  className="text-xs border border-gray-200 rounded-md px-2 py-1 bg-white font-medium text-gray-700 focus:outline-none focus:ring-1 focus:ring-brand-green"
                >
                  <option value="per_month">Per Month</option>
                  <option value="per_annum">Per Annum</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-700 font-medium mb-1">
                  Minimum Amount (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs text-gray-400 font-bold">
                    ₹
                  </span>
                  <input
                    type="number"
                    min="0"
                    placeholder="e.g. 25000"
                    value={formData.salaryMin || ''}
                    onChange={(e) => onChange('salaryMin', e.target.value)}
                    className={`w-full border rounded-lg pl-8 pr-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 ${
                      errors?.salaryMin
                        ? 'border-red-500 focus:ring-red-200'
                        : 'border-gray-200 focus:ring-brand-green/20 focus:border-brand-green'
                    }`}
                  />
                </div>
                {errors?.salaryMin && (
                  <p className="mt-1 text-xs text-red-500 font-medium">{errors.salaryMin}</p>
                )}
              </div>

              <div>
                <label className="block text-xs text-gray-700 font-medium mb-1">
                  Maximum Amount (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs text-gray-400 font-bold">
                    ₹
                  </span>
                  <input
                    type="number"
                    min="0"
                    placeholder="e.g. 40000"
                    value={formData.salaryMax || ''}
                    onChange={(e) => onChange('salaryMax', e.target.value)}
                    className={`w-full border rounded-lg pl-8 pr-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 ${
                      errors?.salaryMax
                        ? 'border-red-500 focus:ring-red-200'
                        : 'border-gray-200 focus:ring-brand-green/20 focus:border-brand-green'
                    }`}
                  />
                </div>
                {errors?.salaryMax && (
                  <p className="mt-1 text-xs text-red-500 font-medium">{errors.salaryMax}</p>
                )}
              </div>
            </div>
            <p className="text-xs text-gray-500">
              💡 Candidates will see salary as:{' '}
              <strong className="text-brand-green">
                ₹{formData.salaryMin ? Number(formData.salaryMin).toLocaleString('en-IN') : '25,000'} - ₹
                {formData.salaryMax ? Number(formData.salaryMax).toLocaleString('en-IN') : '40,000'}{' '}
                {formData.salaryPeriod === 'per_annum' ? '/ Year' : '/ Month'}
              </strong>
            </p>
          </div>
        )}

        {salaryType === 'negotiable' && (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-xs text-gray-600">
            Salary will be marked as <strong>&quot;Not Disclosed / Best in Industry&quot;</strong> on candidate job listing.
          </div>
        )}
      </div>

      <hr className="border-gray-100" />

      {/* Benefits & Perks Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
            <Gift className="w-4 h-4 text-brand-green" />
            Benefits & Perks Offered
          </h4>
          <span className="text-xs text-gray-400">Select or add custom perks</span>
        </div>

        {/* Popular Benefits Quick Add */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-2.5 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Popular Employee Benefits (Click to add):
          </label>
          <div className="flex flex-wrap gap-2">
            {POPULAR_BENEFITS.map((benefit) => {
              const isSelected = currentBenefits.includes(benefit);
              return (
                <button
                  key={benefit}
                  type="button"
                  onClick={() => handleToggleBenefit(benefit)}
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
                  {benefit}
                </button>
              );
            })}
          </div>
        </div>

        {/* Custom Benefit Input */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">
            Add Custom Benefit / Perk
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={customBenefitInput}
              onChange={(e) => setCustomBenefitInput(e.target.value)}
              onKeyDown={handleKeyDownCustomBenefit}
              placeholder="e.g. Free Cab Service, Annual Medical Checkup"
              className="flex-1 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green"
            />
            <button
              type="button"
              onClick={handleAddCustomBenefit}
              className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors flex items-center gap-1"
            >
              <Plus className="w-4 h-4" /> Add
            </button>
          </div>
        </div>

        {/* Selected Benefits Chips */}
        {currentBenefits.length > 0 && (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
            <span className="block text-xs font-bold text-gray-700 mb-2">
              Selected Benefits ({currentBenefits.length}):
            </span>
            <div className="flex flex-wrap gap-2">
              {currentBenefits.map((b) => (
                <span
                  key={b}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-brand-green/30 text-brand-green text-xs font-semibold rounded-lg shadow-2xs"
                >
                  {b}
                  <button
                    type="button"
                    onClick={() => handleRemoveBenefit(b)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Benefits Description Textarea */}
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-2">
            Benefits Description
          </label>
          <p className="text-xs text-gray-500 mb-2">
            Provide additional details on employee perks, bonus eligibility, insurance plans, or work culture incentives.
          </p>
          <textarea
            value={formData.benefitsDescription || ''}
            onChange={(e) => onChange('benefitsDescription', e.target.value)}
            placeholder="e.g. We provide comprehensive health insurance covering up to ₹5 Lakhs for employees and dependents, performance bonuses paid quarterly, and 24 days of paid leaves per year..."
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

export default SalaryBenefits;
