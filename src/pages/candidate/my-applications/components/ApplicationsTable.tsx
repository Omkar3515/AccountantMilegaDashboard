import React from 'react';
import { BadgeCheck, BriefcaseBusiness, Calendar, FileText, MoreVertical } from 'lucide-react';
import type { ApplicationItem, ApplicationStatus } from '../types';

interface ApplicationsTableProps {
  applications: ApplicationItem[];
  onViewDetails: (app: ApplicationItem) => void;
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

const ApplicationsTable: React.FC<ApplicationsTableProps> = ({ applications, onViewDetails }) => {
  return (
    <section className="bg-white border border-slate-200 rounded-xl overflow-hidden mt-4 shadow-sm">
      <div className="w-full">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <th className="py-3 px-4 font-semibold">Job Details</th>
              <th className="py-3 px-3 font-semibold">Application Date</th>
              <th className="py-3 px-3 font-semibold">Status</th>
              <th className="py-3 px-4 font-semibold text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {applications.length > 0 ? (
              applications.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-4 px-4 align-middle">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-11 h-11 rounded-xl grid place-items-center font-bold text-sm shrink-0 shadow-sm ${item.color}`}
                      >
                        {item.initials}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-bold text-sm text-slate-900 truncate">{item.title}</h3>
                          <BadgeCheck className="w-4 h-4 text-blue-600 shrink-0 inline" />
                        </div>
                        <p className="text-xs text-slate-500 font-medium truncate mt-0.5">
                          {item.company}
                        </p>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-2">
                          <span className="flex items-center gap-1">{item.location}</span>
                          <span className="flex items-center gap-1">
                            <BriefcaseBusiness className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            {item.salary}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-3 align-middle whitespace-nowrap text-slate-700">
                    <div className="flex items-center gap-1.5 text-xs font-medium">
                      <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{item.appliedDate}</span>
                    </div>
                  </td>

                  <td className="py-4 px-3 align-middle whitespace-nowrap">
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusBadgeStyle(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </span>
                    <p className="text-[11px] text-slate-500 font-medium mt-1">{item.statusNote}</p>
                  </td>

                  <td className="py-4 px-4 align-middle text-center whitespace-nowrap">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => onViewDetails(item)}
                        className="border border-blue-700 text-blue-700 hover:bg-blue-50 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                      >
                        View Details
                      </button>
                      <button
                        title="More Options"
                        className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-12 text-center text-slate-500">
                  <div className="max-w-xs mx-auto text-center">
                    <FileText className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                    <p className="font-semibold text-slate-700">No applications found</p>
                    <p className="text-xs text-slate-400 mt-1">
                      Apply to relevant jobs to track your progress here.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ApplicationsTable;