import React, { useState, useEffect } from 'react';
import { Eye, Edit3, MoreVertical, ChevronLeft, ChevronRight, Pause, Play, Archive, Trash2 } from 'lucide-react';
import type { ManagedJob, JobStatus } from '../types';
import { STATUS_DISPLAY_MAP, STATUS_BADGE_STYLES } from '../types';

interface JobsTableProps {
  jobs: ManagedJob[];
  totalFilteredCount: number;
  totalJobsCount: number;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  actionLoadingId: string | null;
  onView: (job: ManagedJob) => void;
  onEdit: (job: ManagedJob) => void;
  onPause: (id: string) => void;
  onResume: (id: string) => void;
  onClose: (id: string) => void;
  onDelete: (id: string) => void;
}

const AVATAR_COLORS = [
  'bg-purple-100 text-purple-600 border border-purple-200',
  'bg-emerald-100 text-emerald-700 border border-emerald-200',
  'bg-amber-100 text-amber-700 border border-amber-200',
  'bg-blue-100 text-blue-700 border border-blue-200',
  'bg-rose-100 text-rose-700 border border-rose-200',
];

const getInitials = (title: string) =>
  title
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('');

const getAvatarColor = (title: string) => {
  const index = title.charCodeAt(0) % AVATAR_COLORS.length;
  return AVATAR_COLORS[index];
};

const JobsTable: React.FC<JobsTableProps> = ({
  jobs,
  totalFilteredCount,
  totalJobsCount,
  currentPage,
  totalPages,
  onPageChange,
  actionLoadingId,
  onView,
  onEdit,
  onPause,
  onResume,
  onClose,
  onDelete,
}) => {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  useEffect(() => {
    if (!openMenuId) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.action-menu-container')) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openMenuId]);

  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/80 border-b border-gray-100 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
              <th className="py-3.5 px-4">Job Title</th>
              <th className="py-3.5 px-4 text-center">Applications</th>
              <th className="py-3.5 px-4 text-center">Views</th>
              <th className="py-3.5 px-4 text-center">Status</th>
              <th className="py-3.5 px-4 text-center">Posted On</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {jobs.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-8 text-gray-400">
                  No job postings found matching your filters.
                </td>
              </tr>
            ) : (
              jobs.map((job) => {
                const status = job.status as JobStatus;
                const isBusy = actionLoadingId === job.id;
                const isClosed = status === 'closed';

                return (
                  <tr key={job.id} className="hover:bg-gray-50/70 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-xl ${getAvatarColor(job.title)} grid place-items-center font-bold text-xs shrink-0`}
                        >
                          {getInitials(job.title)}
                        </div>
                        <div>
                          <p
                            onClick={() => onView(job)}
                            className="font-bold text-gray-900 text-sm hover:text-brand-green transition-colors cursor-pointer"
                          >
                            {job.title}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5 text-gray-500 text-xs">
                            <span>{job.department || '-'}</span>
                            <span>•</span>
                            <span>{job.location || '-'}</span>
                          </div>
                          {job.employmentType && (
                            <span className="inline-block mt-1 text-[10px] font-semibold px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-100">
                              {job.employmentType}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4 text-center">
                      <p className="font-bold text-gray-900 text-sm">{job.applicationsCount}</p>
                      <p className="text-[10px] text-gray-400 font-medium">Applications</p>
                    </td>

                    <td className="py-4 px-4 text-center">
                      <p className="font-bold text-gray-900 text-sm">{job.views}</p>
                      <p className="text-[10px] text-gray-400 font-medium">Views</p>
                    </td>

                    <td className="py-4 px-4 text-center">
                      <span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${STATUS_BADGE_STYLES[status]}`}>
                        {STATUS_DISPLAY_MAP[status]}
                      </span>
                    </td>

                    <td className="py-4 px-4 text-center text-gray-600 font-medium text-xs whitespace-nowrap">
                      {new Date(job.createdAt).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>

                    <td className="py-4 px-4 text-right relative action-menu-container">
                      <div className="flex items-center justify-end gap-1 text-gray-400">
                        <button
                          onClick={() => onView(job)}
                          className="p-1.5 hover:bg-brand-light hover:text-brand-green rounded-lg transition-colors"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => !isClosed && onEdit(job)}
                          disabled={isClosed}
                          className="p-1.5 hover:bg-brand-light hover:text-brand-green rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                          title={isClosed ? 'Closed jobs cannot be edited' : 'Edit'}
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setOpenMenuId(openMenuId === job.id ? null : job.id)}
                          disabled={isBusy}
                          className="p-1.5 hover:bg-brand-light hover:text-brand-green rounded-lg transition-colors disabled:opacity-40"
                          title="More"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>

                      {openMenuId === job.id && (
                        <div className="absolute right-4 top-12 z-10 w-40 bg-white border border-gray-100 rounded-lg shadow-lg py-1 text-left">
                          {status === 'published' && (
                            <button
                              onClick={() => { onPause(job.id); setOpenMenuId(null); }}
                              className="w-full flex items-center gap-2 px-3 py-2 text-xs text-gray-700 hover:bg-gray-50"
                            >
                              <Pause className="w-3.5 h-3.5" /> Pause Job
                            </button>
                          )}
                          {status === 'paused' && (
                            <button
                              onClick={() => { onResume(job.id); setOpenMenuId(null); }}
                              className="w-full flex items-center gap-2 px-3 py-2 text-xs text-gray-700 hover:bg-gray-50"
                            >
                              <Play className="w-3.5 h-3.5" /> Resume Job
                            </button>
                          )}
                          {(status === 'published' || status === 'paused') && (
                            <button
                              onClick={() => { onClose(job.id); setOpenMenuId(null); }}
                              className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-600 hover:bg-rose-50"
                            >
                              <Archive className="w-3.5 h-3.5" /> Close Job
                            </button>
                          )}
                          <button
                            onClick={() => { onDelete(job.id); setOpenMenuId(null); }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-600 hover:bg-rose-50"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="p-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
        <p>
          Showing {jobs.length} of {totalFilteredCount} jobs (total: {totalJobsCount})
        </p>

        <div className="flex items-center gap-1">
          <button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="w-7 h-7 rounded border border-gray-200 grid place-items-center text-gray-400 hover:bg-gray-50 disabled:opacity-40"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-7 h-7 rounded border font-bold grid place-items-center ${
                page === currentPage
                  ? 'border-brand-green bg-brand-light text-brand-green'
                  : 'border-gray-200 text-gray-700 font-medium hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="w-7 h-7 rounded border border-gray-200 grid place-items-center text-gray-700 hover:bg-gray-50 disabled:opacity-40"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobsTable;