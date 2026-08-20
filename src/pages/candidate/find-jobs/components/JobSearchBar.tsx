import React from 'react';
import { Search, MapPin, ChevronDown } from 'lucide-react';

interface JobSearchBarProps {
  searchInput: string;
  onSearchInputChange: (value: string) => void;
  locationInput: string;
  onLocationInputChange: (value: string) => void;
  onSearch: () => void;
  onPopularSearchClick: (term: string) => void;
}

const POPULAR_SEARCHES = ['Accountant', 'Tally', 'Tax Executive', 'Audit', 'CA Articleship', 'Finance'];

const JobSearchBar: React.FC<JobSearchBarProps> = ({
  searchInput,
  onSearchInputChange,
  locationInput,
  onLocationInputChange,
  onSearch,
  onPopularSearchClick,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') onSearch();
  };

  return (
    <section className="find-jobs-card bg-white border border-slate-200 rounded-xl p-4 mt-5">
      <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr_130px_80px] gap-3">
        <div className="border border-slate-200 rounded-lg px-3 py-3 text-sm flex gap-2 items-center">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => onSearchInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Job title, keywords or company"
            className="flex-1 outline-none placeholder-slate-400"
          />
        </div>
        <div className="border border-slate-200 rounded-lg px-3 py-3 text-sm flex gap-2 items-center">
          <MapPin className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={locationInput}
            onChange={(e) => onLocationInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="City, State or Work From Home"
            className="flex-1 outline-none placeholder-slate-400"
          />
        </div>
        <button className="border border-slate-200 rounded-lg px-3 py-3 text-left text-sm flex justify-between items-center">
          Experience <ChevronDown className="w-4 h-4" />
        </button>
        <button
          onClick={onSearch}
          className="bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-sm font-semibold"
        >
          Search Jobs
        </button>
      </div>
      <div className="flex flex-wrap gap-2 mt-4 text-xs items-center">
        <b className="mr-1">Popular Searches:</b>
        {POPULAR_SEARCHES.map((term) => (
          <button
            key={term}
            onClick={() => onPopularSearchClick(term)}
            className="border border-slate-200 rounded-full px-3 py-1.5 text-blue-700 hover:bg-blue-50"
          >
            {term}
          </button>
        ))}
      </div>
    </section>
  );
};

export default JobSearchBar;