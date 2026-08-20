import React from 'react';
import { ChevronDown, Grid2X2, List } from 'lucide-react';
import JobSearchBar from './components/JobSearchBar';
import JobCard from './components/JobCard';
import FiltersSidebar from './components/FiltersSidebar';
import RecommendedWidget from './components/RecommendedWidget';
import { useFindJobs } from './hooks/useFindJobs';
import type { PublicJob } from './types';

interface FindJobsProps {
  onViewJobDetails?: (jobId: string) => void;
}

const FindJobs: React.FC<FindJobsProps> = ({ onViewJobDetails }) => {
  const {
    jobs,
    totalCount,
    isLoading,
    errorMessage,
    searchInput,
    setSearchInput,
    locationInput,
    setLocationInput,
    handleSearch,
    handlePopularSearchClick,
    employmentType,
    handleEmploymentTypeChange,
    experience,
    handleExperienceChange,
    salaryMin,
    salaryMax,
    handleSalaryRangeChange,
    handleLocationDropdownChange,
    selectedSkills,
    handleToggleSkill,
    handleClearFilters,
  } = useFindJobs();

  const handleViewDetails = (job: PublicJob) => {
    onViewJobDetails?.(job.id);
  };

  return (
    <div className="find-jobs-page max-w-[1220px] mx-auto">
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_295px] gap-7">
        <div>
          <h1 className="text-2xl font-bold">Find Jobs</h1>
          <p className="text-sm text-slate-500 mt-1">
            Explore the latest accountant jobs and grow your career.
          </p>

          <JobSearchBar
            searchInput={searchInput}
            onSearchInputChange={setSearchInput}
            locationInput={locationInput}
            onLocationInputChange={setLocationInput}
            onSearch={handleSearch}
            onPopularSearchClick={handlePopularSearchClick}
          />

          <div className="flex flex-wrap justify-between gap-3 items-center mt-5 mb-1">
            <p className="text-sm text-slate-600">
              {isLoading ? 'Loading jobs...' : `Showing ${jobs.length} of ${totalCount} jobs`}
            </p>
            <div className="flex gap-3 items-center">
              <span className="text-sm">Sort by:</span>
              <button className="border border-slate-200 rounded-lg px-4 py-2 text-sm flex items-center gap-8">
                Most Relevant
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="bg-white border border-slate-200 rounded-lg p-1 flex">
                <button className="bg-blue-50 text-blue-700 p-1.5 rounded">
                  <List className="w-4 h-4" />
                </button>
                <button className="text-slate-500 p-1.5">
                  <Grid2X2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {errorMessage && (
            <div className="bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-xl px-4 py-3 mb-4">
              {errorMessage}
            </div>
          )}

          <section className="bg-white border border-slate-200 rounded-xl overflow-hidden mt-1">
            {isLoading ? (
              <div className="text-center py-10 text-slate-400 text-sm">Loading jobs...</div>
            ) : jobs.length === 0 ? (
              <div className="text-center py-10 text-slate-400 text-sm">
                No jobs found matching your search.
              </div>
            ) : (
              jobs.map((job) => (
                <JobCard key={job.id} job={job} onViewDetails={handleViewDetails} />
              ))
            )}
          </section>
        </div>

        <aside className="space-y-5">
          <FiltersSidebar
            employmentType={employmentType}
            onEmploymentTypeChange={handleEmploymentTypeChange}
            experience={experience}
            onExperienceChange={handleExperienceChange}
            salaryMin={salaryMin}
            salaryMax={salaryMax}
            onSalaryRangeChange={handleSalaryRangeChange}
            locationValue={locationInput}
            onLocationChange={handleLocationDropdownChange}
            selectedSkills={selectedSkills}
            onToggleSkill={handleToggleSkill}
            onClearAll={handleClearFilters}
          />
          <RecommendedWidget />
        </aside>
      </div>
    </div>
  );
};

export default FindJobs;