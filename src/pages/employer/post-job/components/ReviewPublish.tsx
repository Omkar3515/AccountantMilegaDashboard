import React, { useState } from 'react';
import {
  Edit3,
  Briefcase,
  IndianRupee,
  Wrench,
  CheckCircle2,
  Clock,
  ShieldCheck,
  MapPin,
  Users,
  GraduationCap,
  Sparkles,
  HelpCircle,
  FileQuestion,
  UserCheck,
} from 'lucide-react';
import type { JobFormData } from '../types';

interface ReviewPublishProps {
  formData: JobFormData;
  onEditStep?: (step: number) => void;
  onPublish?: () => void;
  onPrev?: () => void;
  isSubmitting?: boolean;
}

const ReviewPublish: React.FC<ReviewPublishProps> = ({
  formData,
  onEditStep,
  onPublish,
  onPrev,
  isSubmitting,
}) => {
  const [publishedSubmitted, setPublishedSubmitted] = useState(false);

  const handlePublishClick = async () => {
    if (onPublish) {
      await onPublish();
      setPublishedSubmitted(true);
    }
  };

  const renderSalarySummary = () => {
    if (formData.salaryType === 'negotiable') {
      return 'Negotiable / Disclosed upon Interview';
    }
    if (formData.salaryType === 'amount') {
      const min = formData.salaryMin
        ? `₹${Number(formData.salaryMin).toLocaleString('en-IN')}`
        : '₹0';
      const max = formData.salaryMax
        ? `₹${Number(formData.salaryMax).toLocaleString('en-IN')}`
        : '';
      const period =
        formData.salaryPeriod === 'per_annum' ? '/ Year' : '/ Month';
      return `${min} ${max ? `- ${max}` : ''} ${period}`;
    }
    const min = formData.salaryMin || '3.5';
    const max = formData.salaryMax || '6.0';
    return `₹${min} - ${max} LPA`;
  };

  return (
    <div className="space-y-6">
      {/* Admin Approval Top Banner */}
      <div className="bg-gradient-to-r from-amber-50 via-amber-50/50 to-emerald-50 border border-amber-200/70 rounded-2xl p-6 shadow-xs">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6 text-amber-600" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h3 className="text-base font-bold text-gray-900">
                Form 5: Review & Publish
              </h3>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
                <Clock className="w-3 h-3" /> Requires Admin Approval
              </span>
            </div>
            <p className="text-xs text-gray-600 mt-1">
              Please check all form sections (Forms 1 - 4) below in view mode. Click <strong>Edit</strong> on any form to make changes. Once submitted, your job post will be published after Admin approval.
            </p>
          </div>
        </div>
      </div>

      {/* Success Notification Banner */}
      {publishedSubmitted && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-emerald-900 shadow-sm flex items-start gap-4">
          <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-emerald-950 text-base">
              Job Post Submitted Successfully!
            </h4>
            <p className="text-xs text-emerald-800 mt-1">
              Your job posting <strong>&quot;{formData.title || 'Senior Accountant'}&quot;</strong> has been submitted. It will be published live once approved by the Admin team.
            </p>
          </div>
        </div>
      )}

      {/* FORM 1 VIEW MODE CARD */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-green/10 text-brand-green flex items-center justify-center font-bold text-xs">
              1
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm">
                Form 1: Job Details
              </h4>
              <p className="text-[11px] text-gray-500">
                Job title, role, employment type, location & description
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onEditStep?.(1)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-brand-green text-brand-green hover:bg-brand-green hover:text-white transition-all text-xs font-bold shadow-2xs"
          >
            <Edit3 className="w-3.5 h-3.5" /> Edit Form 1
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-gray-50/70 p-3 rounded-xl border border-gray-100">
              <span className="text-gray-400 font-medium block mb-1">
                Job Title
              </span>
              <span className="font-bold text-gray-900 text-sm">
                {formData.title || 'Senior Accountant'}
              </span>
            </div>

            <div className="bg-gray-50/70 p-3 rounded-xl border border-gray-100">
              <span className="text-gray-400 font-medium block mb-1">
                Job Role / Department
              </span>
              <span className="font-semibold text-gray-900">
                {formData.role} ({formData.department})
              </span>
            </div>

            <div className="bg-gray-50/70 p-3 rounded-xl border border-gray-100">
              <span className="text-gray-400 font-medium block mb-1 flex items-center gap-1">
                <Briefcase className="w-3.5 h-3.5 text-gray-400" />
                Employment Type
              </span>
              <span className="font-semibold text-gray-900">
                {formData.employmentType}
              </span>
            </div>

            <div className="bg-gray-50/70 p-3 rounded-xl border border-gray-100">
              <span className="text-gray-400 font-medium block mb-1">
                Experience Required
              </span>
              <span className="font-semibold text-gray-900">
                {formData.experience}
              </span>
            </div>

            <div className="bg-gray-50/70 p-3 rounded-xl border border-gray-100">
              <span className="text-gray-400 font-medium block mb-1">
                Notice Period
              </span>
              <span className="font-semibold text-gray-900">
                {formData.noticePeriod}
              </span>
            </div>

            <div className="bg-gray-50/70 p-3 rounded-xl border border-gray-100">
              <span className="text-gray-400 font-medium block mb-1 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-gray-400" /> Openings
              </span>
              <span className="font-semibold text-gray-900">
                {formData.openings} Positions
              </span>
            </div>
          </div>

          <div className="bg-gray-50/70 p-3 rounded-xl border border-gray-100 flex items-center justify-between text-xs">
            <span className="text-gray-500 flex items-center gap-1.5 font-medium">
              <MapPin className="w-4 h-4 text-brand-green" /> Location:
            </span>
            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-900">
                {formData.location || 'Mumbai, Maharashtra'}
              </span>
              {formData.isWorkFromHome && (
                <span className="px-2 py-0.5 rounded bg-brand-green/10 text-brand-green font-bold text-[10px]">
                  Work From Home
                </span>
              )}
            </div>
          </div>

          <div className="bg-gray-50/70 p-4 rounded-xl border border-gray-100 text-xs space-y-1">
            <span className="text-gray-400 font-medium block">
              Job Description Preview:
            </span>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {formData.description || 'Job description details.'}
            </p>
          </div>
        </div>
      </div>

      {/* FORM 2 VIEW MODE CARD */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-green/10 text-brand-green flex items-center justify-center font-bold text-xs">
              2
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm">
                Form 2: Salary & Benefits
              </h4>
              <p className="text-[11px] text-gray-500">
                Compensation structure, LPA/amount inputs & employee benefits
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onEditStep?.(2)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-brand-green text-brand-green hover:bg-brand-green hover:text-white transition-all text-xs font-bold shadow-2xs"
          >
            <Edit3 className="w-3.5 h-3.5" /> Edit Form 2
          </button>
        </div>

        <div className="p-6 space-y-4 text-xs">
          <div className="bg-emerald-50/60 border border-emerald-100 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                <IndianRupee className="w-5 h-5" />
              </div>
              <div>
                <span className="text-gray-500 font-medium block text-[11px]">
                  Salary Package ({formData.salaryType?.toUpperCase() || 'LPA'})
                </span>
                <span className="font-extrabold text-emerald-950 text-base">
                  {renderSalarySummary()}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50/70 p-4 rounded-xl border border-gray-100 space-y-2">
            <span className="text-gray-500 font-medium block">
              Employee Perks & Benefits ({formData.benefits?.length || 0}):
            </span>
            <div className="flex flex-wrap gap-2">
              {formData.benefits && formData.benefits.length > 0 ? (
                formData.benefits.map((b) => (
                  <span
                    key={b}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-brand-green/20 text-brand-green font-semibold rounded-lg text-xs"
                  >
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    {b}
                  </span>
                ))
              ) : (
                <span className="text-gray-400 italic">No benefits selected.</span>
              )}
            </div>
          </div>

          {formData.benefitsDescription && (
            <div className="bg-gray-50/70 p-4 rounded-xl border border-gray-100 space-y-1">
              <span className="text-gray-500 font-medium block">
                Benefits Description:
              </span>
              <p className="text-gray-700 leading-relaxed">
                {formData.benefitsDescription}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* FORM 3 VIEW MODE CARD */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-green/10 text-brand-green flex items-center justify-center font-bold text-xs">
              3
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm">
                Form 3: Skills & Requirements
              </h4>
              <p className="text-[11px] text-gray-500">
                Required skills, qualification criteria & candidate expectations
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onEditStep?.(3)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-brand-green text-brand-green hover:bg-brand-green hover:text-white transition-all text-xs font-bold shadow-2xs"
          >
            <Edit3 className="w-3.5 h-3.5" /> Edit Form 3
          </button>
        </div>

        <div className="p-6 space-y-4 text-xs">
          <div className="bg-gray-50/70 p-4 rounded-xl border border-gray-100 space-y-2">
            <span className="text-gray-500 font-medium block flex items-center gap-1.5">
              <Wrench className="w-3.5 h-3.5 text-brand-green" />
              Required Skills ({formData.skills?.length || 0}):
            </span>
            <div className="flex flex-wrap gap-2">
              {formData.skills && formData.skills.length > 0 ? (
                formData.skills.map((sk) => (
                  <span
                    key={sk}
                    className="px-3 py-1 bg-brand-green/10 text-brand-green font-bold rounded-lg text-xs"
                  >
                    {sk}
                  </span>
                ))
              ) : (
                <span className="text-gray-400 italic">No skills added yet.</span>
              )}
            </div>
          </div>

          <div className="bg-gray-50/70 p-4 rounded-xl border border-gray-100 space-y-2">
            <span className="text-gray-500 font-medium block flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-brand-green" />
              Minimum Education & Qualifications:
            </span>
            <div className="font-bold text-gray-900 text-sm">
              {formData.educationLevel || 'Graduate / Bachelor\'s Degree'}
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {formData.qualifications && formData.qualifications.length > 0 ? (
                formData.qualifications.map((q) => (
                  <span
                    key={q}
                    className="px-2.5 py-0.5 bg-gray-200 text-gray-800 rounded font-semibold text-[11px]"
                  >
                    {q}
                  </span>
                ))
              ) : (
                <span className="text-gray-400 italic">Any qualification.</span>
              )}
            </div>
          </div>

          {formData.skillsDescription && (
            <div className="bg-gray-50/70 p-4 rounded-xl border border-gray-100 space-y-1">
              <span className="text-gray-500 font-medium block">
                Detailed Skill & Candidate Requirements:
              </span>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {formData.skillsDescription}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* FORM 4 VIEW MODE CARD */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-green/10 text-brand-green flex items-center justify-center font-bold text-xs">
              4
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm">
                Form 4: Additional Information
              </h4>
              <p className="text-[11px] text-gray-500">
                Screening questions, hiring timeline, gender preference & instructions
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onEditStep?.(4)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-brand-green text-brand-green hover:bg-brand-green hover:text-white transition-all text-xs font-bold shadow-2xs"
          >
            <Edit3 className="w-3.5 h-3.5" /> Edit Form 4
          </button>
        </div>

        <div className="p-6 space-y-4 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50/70 p-3 rounded-xl border border-gray-100">
              <span className="text-gray-400 font-medium block mb-1 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-gray-400" /> Hiring Timeline
              </span>
              <span className="font-semibold text-gray-900">
                {formData.hiringTimeline || 'Urgent (Immediate Joiner)'}
              </span>
            </div>

            <div className="bg-gray-50/70 p-3 rounded-xl border border-gray-100">
              <span className="text-gray-400 font-medium block mb-1 flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5 text-gray-400" /> Gender Preference
              </span>
              <span className="font-semibold text-gray-900">
                {formData.preferredGender || 'Any / No Preference'}
              </span>
            </div>
          </div>

          {/* Screening Questions List */}
          {formData.screeningQuestions && formData.screeningQuestions.length > 0 && (
            <div className="bg-gray-50/70 p-4 rounded-xl border border-gray-100 space-y-2">
              <span className="text-gray-500 font-medium block flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-brand-green" />
                Screening Questions ({formData.screeningQuestions.length}):
              </span>
              <div className="space-y-1.5">
                {formData.screeningQuestions.map((q, idx) => (
                  <div
                    key={idx}
                    className="p-2 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-800 flex items-center gap-2"
                  >
                    <span className="w-4 h-4 rounded-full bg-brand-green/10 text-brand-green text-[10px] font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    {q}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Candidate Instructions */}
          {(formData.candidateInstructions || formData.additionalInfo) && (
            <div className="bg-gray-50/70 p-4 rounded-xl border border-gray-100 space-y-1">
              <span className="text-gray-500 font-medium block flex items-center gap-1.5">
                <FileQuestion className="w-3.5 h-3.5 text-gray-400" />
                Candidate Instructions & Notes:
              </span>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {formData.candidateInstructions || formData.additionalInfo}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* PUBLISH ACTION FOOTER */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-bold text-gray-900 text-sm">Ready to publish?</h4>
          <p className="text-xs text-gray-500">
            Clicking Publish will submit this job post to Admin for approval.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            type="button"
            onClick={onPrev}
            className="flex-1 md:flex-initial px-6 py-2.5 border border-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all text-sm"
          >
            Back
          </button>
          <button
            type="button"
            onClick={handlePublishClick}
            disabled={isSubmitting}
            className="flex-1 md:flex-initial px-8 py-2.5 bg-brand-green text-white rounded-lg font-extrabold hover:bg-brand-green/90 shadow-md shadow-brand-green/20 transition-all text-sm disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              'Submitting...'
            ) : publishedSubmitted ? (
              <>
                <CheckCircle2 className="w-4 h-4" /> Submitted to Admin
              </>
            ) : (
              <>Publish Job (Send for Admin Approval)</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewPublish;
