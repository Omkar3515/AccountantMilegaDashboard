import React from 'react';
import { Briefcase, Send, Pause, Archive } from 'lucide-react';
import type { JobStatus } from '../types';

interface JobStatsCardsProps {
  stats: { total: number; active: number; paused: number; closed: number };
  onFilterClick: (status: 'All' | JobStatus) => void;
}

const JobStatsCards: React.FC<JobStatsCardsProps> = ({ stats, onFilterClick }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-gray-500">Total Jobs</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
          <button onClick={() => onFilterClick('All')} className="text-xs font-semibold text-brand-green hover:underline mt-2">
            View all jobs
          </button>
        </div>
        <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 grid place-items-center shrink-0">
          <Briefcase className="w-6 h-6" />
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-gray-500">Active Jobs</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{stats.active}</p>
          <button onClick={() => onFilterClick('published')} className="text-xs font-semibold text-brand-green hover:underline mt-2">
            View active jobs
          </button>
        </div>
        <div className="w-12 h-12 rounded-xl bg-brand-light text-brand-green grid place-items-center shrink-0">
          <Send className="w-6 h-6" />
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-gray-500">Paused Jobs</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{stats.paused}</p>
          <button onClick={() => onFilterClick('paused')} className="text-xs font-semibold text-amber-600 hover:underline mt-2">
            View paused jobs
          </button>
        </div>
        <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 grid place-items-center shrink-0">
          <Pause className="w-6 h-6" />
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-gray-500">Closed Jobs</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{stats.closed}</p>
          <button onClick={() => onFilterClick('closed')} className="text-xs font-semibold text-rose-600 hover:underline mt-2">
            View closed jobs
          </button>
        </div>
        <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 grid place-items-center shrink-0">
          <Archive className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

export default JobStatsCards;