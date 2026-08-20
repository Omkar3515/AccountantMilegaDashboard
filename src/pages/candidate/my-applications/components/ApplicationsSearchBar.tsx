import React from 'react';
import { ChevronDown, Filter, Search } from 'lucide-react';

interface ApplicationsSearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
}

const ApplicationsSearchBar: React.FC<ApplicationsSearchBarProps> = ({
  searchTerm,
  onSearchChange,
  sortBy,
  onSortChange,
}) => {
  return (
    <section className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm mt-6">
      <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_auto] gap-3">
        <div className="border border-slate-200 rounded-lg px-3 py-2.5 text-sm flex items-center gap-2 text-slate-600 bg-white focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Search by job title or company..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-transparent outline-none text-slate-800 placeholder-slate-400 text-xs sm:text-sm"
          />
        </div>

        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full appearance-none border border-slate-200 rounded-lg px-3 py-2.5 text-xs sm:text-sm text-slate-700 bg-white focus:outline-none focus:border-blue-500 pr-8 font-medium cursor-pointer"
          >
            <option value="Recent">Sort by: Recent</option>
            <option value="Title (A-Z)">Sort by: Title (A-Z)</option>
          </select>
          <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        <button className="border border-slate-200 rounded-lg px-4 py-2.5 text-xs sm:text-sm text-slate-700 font-semibold flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors">
          <Filter className="w-4 h-4 text-slate-500" />
          More Filters
        </button>
      </div>
    </section>
  );
};

export default ApplicationsSearchBar;