import React from 'react';
import { Inbox } from 'lucide-react';

// NOTE: Real activity feed (new applications, views spikes, hires) needs
// the Applications module. Until then, this shows a clean empty state
// instead of fake/mock entries.
const RecentActivityWidget: React.FC = () => {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-gray-900">Recent Activity</h2>
      </div>

      <div className="flex flex-col items-center justify-center py-6 text-center">
        <div className="w-10 h-10 rounded-full bg-gray-50 grid place-items-center mb-2">
          <Inbox className="w-5 h-5 text-gray-300" />
        </div>
        <p className="text-xs text-gray-400">No recent activity yet</p>
      </div>
    </div>
  );
};

export default RecentActivityWidget;