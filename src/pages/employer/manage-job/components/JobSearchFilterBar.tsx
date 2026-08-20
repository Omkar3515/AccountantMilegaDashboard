import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import type { JobStatus } from '../types';

interface JobSearchFilterBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  statusFilter: 'All' | JobStatus;
  onStatusChange: (value: 'All' | JobStatus) => void;
  deptFilter: string;
  onDeptChange: (value: string) => void;
}

const JobSearchFilterBar: React.FC<JobSearchFilterBarProps> = ({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  deptFilter,
  onDeptChange,
}) => {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
      <div className="relative flex-1 w-full">
        <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search job title, role or department..."
          className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green focus:bg-white transition-all"
        />
      </div>

      <div className="flex items-center gap-2.5 w-full md:w-auto">
        <select
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value as 'All' | JobStatus)}
          className="px-3 py-2 text-sm rounded-lg border border-gray-200 bg-white font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green"
        >
          <option value="All">All Status</option>
          <option value="published">Active</option>
          <option value="paused">Paused</option>
          <option value="closed">Closed</option>
          <option value="draft">Draft</option>
          <option value="pending_approval">Pending Approval</option>
        </select>

        <select
          value={deptFilter}
          onChange={(e) => onDeptChange(e.target.value)}
          className="px-3 py-2 text-sm rounded-lg border border-gray-200 bg-white font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green"
        >
          <option value="All">All Departments</option>
          <option value="Accounts & Finance">Accounts & Finance</option>
          <option value="Taxation">Taxation</option>
          <option value="Audit">Audit</option>
          <option value="Accounting">Accounting</option>
        </select>

        <button className="border border-gray-200 text-gray-700 hover:bg-gray-50 px-3 py-2 rounded-lg text-sm font-semibold flex items-center gap-1.5 transition-colors shrink-0">
          <SlidersHorizontal className="w-4 h-4 text-gray-500" /> More Filters
        </button>
      </div>
    </div>
  );
};

export default JobSearchFilterBar;