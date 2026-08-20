import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  MapPin,
  BriefcaseBusiness,
  Clock,
  IndianRupee,
  GraduationCap,
  Bookmark,
  Building2,
  CheckCircle2,
} from 'lucide-react';
import { useJobDetail } from '../hooks/useJobDetail';
import { applyToJob, checkApplicationStatus } from '../../my-applications/services/applicationService';

interface JobDetailPageProps {
  jobId: string;
  onBack: () => void;
}

const formatSalary = (job: {
  salaryType?: string;
  salaryMin?: string;
  salaryMax?: string;
  salaryPeriod?: string;
}): string => {
  if (job.salaryType === 'negotiable') return 'Best in Industry (Negotiable)';
  if (!job.salaryMin && !job.salaryMax) return 'Not Disclosed';

  if (job.salaryType === 'lpa') {
    return `₹${job.salaryMin || '-'} - ${job.salaryMax || '-'} LPA`;
  }

  const min = job.salaryMin ? Number(job.salaryMin).toLocaleString('en-IN') : '-';
  const max = job.salaryMax ? Number(job.salaryMax).toLocaleString('en-IN') : '-';
  const period = job.salaryPeriod === 'per_annum' ? '/ Year' : '/ Month';
  return `₹${min} - ₹${max} ${period}`;
};

const formatPostedDate = (createdAt: string): string => {
  return new Date(createdAt).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

const JobDetailPage: React.FC<JobDetailPageProps> = ({ jobId, onBack }) => {
  const { job, isLoading, errorMessage } = useJobDetail(jobId);

  const [hasApplied, setHasApplied] = useState(false);
  const [isCheckingStatus, setIsCheckingStatus] = useState(true);
  const [isApplying, setIsApplying] = useState(false);
  const [applyError, setApplyError] = useState<string | null>(null);

  useEffect(() => {
    if (!jobId) return;
    checkApplicationStatus(jobId).then((result) => {
      setHasApplied(result.hasApplied);
      setIsCheckingStatus(false);
    });
  }, [jobId]);

  const handleApply = async () => {
    setIsApplying(true);
    setApplyError(null);
    const result = await applyToJob(jobId);
    if (result.success) {
      setHasApplied(true);
    } else {
      setApplyError(result.message || 'Failed to submit application');
    }
    setIsApplying(false);
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center text-slate-400 text-sm">
        Loading job details...
      </div>
    );
  }

  if (errorMessage || !job) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center">
        <p className="text-slate-500 text-sm mb-4">
          {errorMessage || 'This job is no longer available.'}
        </p>
        <button onClick={onBack} className="text-blue-700 text-sm font-semibold hover:underline">
          ← Back to Find Jobs
        </button>
      </div>
    );
  }

  const companyName = job.companyProfileId?.companyName || 'Company Name Not Available';
  const displayLocation = job.isWorkFromHome ? 'Work From Home' : job.location || '-';

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-slate-600 hover:text-blue-700 mb-4"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Find Jobs
      </button>

      {/* Header Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-xl bg-blue-700 text-white grid place-items-center text-2xl font-bold shrink-0">
              {job.title.charAt(0)}
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">{job.title}</h1>
              <p className="text-sm text-slate-600 mt-1 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5" /> {companyName}
              </p>
              <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-slate-500 mt-3">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> {displayLocation}
                </span>
                {job.experience && (
                  <span className="flex items-center gap-1">
                    <BriefcaseBusiness className="w-3.5 h-3.5" /> {job.experience}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <IndianRupee className="w-3.5 h-3.5" /> {formatSalary(job)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> Posted {formatPostedDate(job.createdAt)}
                </span>
              </div>
            </div>
          </div>
          <Bookmark className="w-5 h-5 text-slate-400 hover:text-blue-700 cursor-pointer shrink-0" />
        </div>

        {applyError && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg px-3 py-2 mt-4">
            {applyError}
          </div>
        )}

        <div className="flex gap-3 mt-6">
          {hasApplied ? (
            <button
              disabled
              className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-6 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 cursor-default"
            >
              <CheckCircle2 className="w-4 h-4" /> Applied
            </button>
          ) : (
            <button
              onClick={handleApply}
              disabled={isApplying || isCheckingStatus}
              className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2.5 rounded-lg text-sm font-semibold disabled:opacity-60 transition-colors"
            >
              {isApplying ? 'Submitting...' : 'Apply Now'}
            </button>
          )}
          <button className="border border-slate-200 text-slate-700 px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-50">
            Save Job
          </button>
        </div>
      </div>

      {/* Job Description */}
      {job.description && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 mt-4">
          <h2 className="font-bold text-sm text-slate-900 mb-3">Job Description</h2>
          <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
            {job.description}
          </p>
        </div>
      )}

      {/* Skills Required */}
      {job.skills && job.skills.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 mt-4">
          <h2 className="font-bold text-sm text-slate-900 mb-3">Skills Required</h2>
          <div className="flex flex-wrap gap-2">
            {job.skills.map((skill) => (
              <span
                key={skill}
                className="border border-slate-200 rounded-md px-3 py-1.5 text-xs text-slate-600"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Education Requirement */}
      {job.educationLevel && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 mt-4">
          <h2 className="font-bold text-sm text-slate-900 mb-3 flex items-center gap-2">
            <GraduationCap className="w-4 h-4" /> Minimum Education
          </h2>
          <p className="text-sm text-slate-600">{job.educationLevel}</p>
        </div>
      )}

      {/* Company Info */}
      {job.companyProfileId && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 mt-4">
          <h2 className="font-bold text-sm text-slate-900 mb-3">About the Company</h2>
          <p className="text-sm text-slate-600">{companyName}</p>
          {job.companyProfileId.industry && (
            <p className="text-xs text-slate-500 mt-1">{job.companyProfileId.industry}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default JobDetailPage;