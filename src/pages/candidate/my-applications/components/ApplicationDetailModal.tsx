import React from 'react';
import { X } from 'lucide-react';
import type { ApplicationItem, ApplicationStatus } from '../types';

interface ApplicationDetailModalProps {
  application: ApplicationItem;
  onClose: () => void;
  onWithdraw: (id: string) => void;
}

const getStatusBadgeStyle = (status: ApplicationStatus) => {
  switch (status) {
    case 'Interview Scheduled':
      return 'bg-blue-50 text-blue-700 border border-blue-100';
    case 'Applied':
      return 'bg-indigo-50 text-indigo-700 border border-indigo-100';
    case 'Shortlisted':
      return 'bg-amber-50 text-amber-700 border border-amber-100';
    case 'Offered':
      return 'bg-emerald-50 text-emerald-700 border border-emerald-100';
    case 'Rejected':
      return 'bg-rose-50 text-rose-600 border border-rose-100';
    default:
      return 'bg-slate-100 text-slate-700 border border-slate-200';
  }
};

const ApplicationDetailModal: React.FC<ApplicationDetailModalProps> = ({
  application,
  onClose,
  onWithdraw,
}) => {
  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-md w-full p-6 relative animate-in fade-in zoom-in duration-150">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className={`w-11 h-11 rounded-xl grid place-items-center font-bold text-sm ${application.color}`}>
            {application.initials}
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-900">{application.title}</h3>
            <p className="text-xs text-slate-500">{application.company}</p>
          </div>
        </div>

        <div className="space-y-3 text-xs text-slate-700 bg-slate-50 rounded-xl p-4 border border-slate-100">
          <p>
            <span className="font-semibold text-slate-900">Applied On:</span> {application.appliedDate}
          </p>
          <p>
            <span className="font-semibold text-slate-900">Location:</span> {application.location}
          </p>
          <p>
            <span className="font-semibold text-slate-900">Salary:</span> {application.salary}
          </p>
          <p>
            <span className="font-semibold text-slate-900">Current Status:</span>{' '}
            <span
              className={`px-2 py-0.5 rounded-full font-semibold text-[11px] ${getStatusBadgeStyle(
                application.status
              )}`}
            >
              {application.status}
            </span>
          </p>
          <p>
            <span className="font-semibold text-slate-900">Employer Note:</span> {application.statusNote}
          </p>
        </div>

        <div className="pt-5 flex justify-end gap-2">
          {application.status === 'Applied' && (
            <button
              onClick={() => onWithdraw(application.id)}
              className="border border-rose-300 text-rose-600 hover:bg-rose-50 rounded-lg px-4 py-2 text-xs font-semibold transition-colors"
            >
              Withdraw Application
            </button>
          )}
          <button
            onClick={onClose}
            className="bg-blue-700 hover:bg-blue-800 text-white rounded-lg px-5 py-2 text-xs font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetailModal;