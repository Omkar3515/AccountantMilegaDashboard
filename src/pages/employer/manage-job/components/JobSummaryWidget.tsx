import React from 'react';
import { Eye, Send, Star, UserCheck } from 'lucide-react';

// NOTE: Applications/Shortlisted/Hired counts are placeholder (0) for now —
// they depend on the Applications module, which isn't built yet.
// Views IS real (comes from job.views in the backend), but this widget
// shows an aggregate summary, not per-job, so wire it up once you have
// a "total views across all jobs" endpoint or compute it client-side
// from the jobs list.
const JobSummaryWidget: React.FC = () => {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-gray-900">Job Summary</h2>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between p-2.5 bg-gray-50 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-brand-light text-brand-green grid place-items-center">
              <Eye className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500">Total Views</p>
              <p className="text-sm font-bold text-gray-900">—</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between p-2.5 bg-gray-50 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 grid place-items-center">
              <Send className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500">Total Applications</p>
              <p className="text-sm font-bold text-gray-900">—</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between p-2.5 bg-gray-50 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 grid place-items-center">
              <Star className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500">Shortlisted</p>
              <p className="text-sm font-bold text-gray-900">—</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between p-2.5 bg-gray-50 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-700 grid place-items-center">
              <UserCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500">Hired</p>
              <p className="text-sm font-bold text-gray-900">—</p>
            </div>
          </div>
        </div>
      </div>

      <p className="text-[11px] text-gray-400 text-center pt-1">
        Full analytics available once Applications module is live
      </p>
    </div>
  );
};

export default JobSummaryWidget;