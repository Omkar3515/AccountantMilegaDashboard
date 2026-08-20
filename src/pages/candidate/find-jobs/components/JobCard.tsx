import React from 'react';
import { Bookmark, BriefcaseBusiness, MapPin } from 'lucide-react';
import type { PublicJob } from '../types';

interface JobCardProps {
  job: PublicJob;
  onViewDetails: (job: PublicJob) => void;
}

const AVATAR_COLORS = [
  'bg-blue-700 text-white',
  'bg-emerald-50 text-emerald-700',
  'bg-amber-500 text-white',
  'bg-violet-50 text-violet-700',
  'bg-teal-500 text-white',
];

const getInitials = (name: string) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('');

const getAvatarColor = (name: string) => {
  const index = name.charCodeAt(0) % AVATAR_COLORS.length;
  return AVATAR_COLORS[index];
};

const formatSalary = (job: PublicJob): string => {
  if (job.salaryType === 'negotiable') return 'Best in Industry';
  if (!job.salaryMin && !job.salaryMax) return 'Not Disclosed';

  if (job.salaryType === 'lpa') {
    return `₹${job.salaryMin || '-'} - ${job.salaryMax || '-'} LPA`;
  }

  const min = job.salaryMin ? Number(job.salaryMin).toLocaleString('en-IN') : '-';
  const max = job.salaryMax ? Number(job.salaryMax).toLocaleString('en-IN') : '-';
  const period = job.salaryPeriod === 'per_annum' ? '/ Year' : '/ Month';
  return `₹${min} - ₹${max} ${period}`;
};

const formatTimeAgo = (createdAt: string): string => {
  const diffMs = Date.now() - new Date(createdAt).getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  if (diffHours < 1) return 'Just now';
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
};

const isNew = (createdAt: string): boolean => {
  const diffMs = Date.now() - new Date(createdAt).getTime();
  return diffMs < 3 * 24 * 60 * 60 * 1000; // less than 3 days old
};

const JobCard: React.FC<JobCardProps> = ({ job, onViewDetails }) => {
  const companyName = job.companyProfileId?.companyName || 'Company Name Not Available';
  const displayLocation = job.isWorkFromHome ? 'Work From Home' : job.location || '-';

  return (
    <article className="find-job-card flex gap-4 p-5 border-b last:border-0 border-slate-100">
      <div
        className={`w-14 h-14 rounded-lg grid place-items-center text-xl font-bold shrink-0 ${getAvatarColor(
          job.title
        )}`}
      >
        {getInitials(job.title)}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3">
          <h2 className="font-bold">{job.title}</h2>
          {isNew(job.createdAt) && (
            <span className="bg-emerald-100 text-emerald-700 text-[10px] font-semibold px-2 py-1 rounded-full">
              New
            </span>
          )}
        </div>
        <p className="text-sm text-slate-600 mt-1">{companyName}</p>
        <div className="flex flex-wrap gap-x-7 gap-y-1 text-xs text-slate-500 mt-3">
          <span>
            <MapPin className="w-3 h-3 inline mr-1" />
            {displayLocation}
          </span>
          {job.experience && (
            <span>
              <BriefcaseBusiness className="w-3 h-3 inline mr-1" />
              {job.experience}
            </span>
          )}
          <span>{formatSalary(job)}</span>
        </div>
        {job.skills && job.skills.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {job.skills.slice(0, 4).map((skill) => (
              <span
                key={skill}
                className="border border-slate-200 rounded-md px-2.5 py-1 text-[11px] text-slate-600"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-col justify-between items-end">
        <span className="text-xs text-slate-400 whitespace-nowrap">
          {formatTimeAgo(job.createdAt)}
        </span>
        <Bookmark className="w-4 h-4 text-slate-600 cursor-pointer hover:text-blue-700" />
        <button
          onClick={() => onViewDetails(job)}
          className="border border-blue-500 text-blue-700 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap hover:bg-blue-50"
        >
          View Details
        </button>
      </div>
    </article>
  );
};

export default JobCard;