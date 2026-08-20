import React, { useState } from 'react';
import { Plus, ExternalLink } from 'lucide-react';
import JobStatsCards from './components/JobStatsCards';
import JobSearchFilterBar from './components/JobSearchFilterBar';
import JobsTable from './components/JobsTable';
import JobSummaryWidget from './components/JobSummaryWidget';
import RecentActivityWidget from './components/RecentActivityWidget';
import UpgradePlanWidget from './components/UpgradePlanWidget';
import ViewJobModal from './components/ViewJobModal';
import { useManageJobs } from './hooks/useManageJobs';
import type { ManagedJob } from './types';

interface ManageJobsProps {
  onNavigate?: (page: string, params?: Record<string, unknown>) => void;
}

export default function ManageJobs({ onNavigate }: ManageJobsProps) {
  const {
    jobs,
    totalFilteredCount,
    totalJobsCount,
    isLoading,
    errorMessage,
    stats,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    deptFilter,
    setDeptFilter,
    currentPage,
    setCurrentPage,
    totalPages,
    actionLoadingId,
    handlePause,
    handleResume,
    handleClose,
    handleDelete,
  } = useManageJobs();

  const [viewingJobId, setViewingJobId] = useState<string | null>(null);

  const handleView = (job: ManagedJob) => {
    setViewingJobId(job.id);
  };

  const handleEdit = (job: ManagedJob) => {
    onNavigate?.('post-job', { mode: 'edit', jobId: job.id });
  };

  const handleUpgradeClick = () => {
    onNavigate?.('billing');
  };

  return (
    <div className="manage-jobs max-w-7xl mx-auto space-y-6 font-sans">
      {/* Breadcrumb & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-sm text-gray-500 mb-1">
            <button
              onClick={() => onNavigate && onNavigate('dashboard')}
              className="hover:text-brand-green hover:underline transition-colors"
            >
              Dashboard
            </button>
            <span className="mx-1.5">›</span>
            <span className="text-gray-700 font-medium">Manage Jobs</span>
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Manage Jobs</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Create, edit and manage all your job postings.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate && onNavigate('post-job')}
            className="bg-brand-green text-white font-bold text-sm px-4 py-2.5 rounded-lg shadow-sm shadow-brand-green/20 flex items-center gap-2 hover:bg-brand-green/90 transition-colors"
          >
            <Plus className="w-4 h-4" /> Post New Job
          </button>
          <button className="border border-gray-200 bg-white text-gray-700 font-semibold text-sm px-4 py-2.5 rounded-lg flex items-center gap-2 hover:bg-gray-50 shadow-sm transition-colors">
            <ExternalLink className="w-4 h-4 text-gray-500" /> View Career Page
          </button>
        </div>
      </div>

      {errorMessage && (
        <div className="bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-xl px-4 py-3">
          {errorMessage}
        </div>
      )}

      <JobStatsCards stats={stats} onFilterClick={setStatusFilter} />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_320px] gap-6 items-start">
        <div className="space-y-4">
          <JobSearchFilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
            deptFilter={deptFilter}
            onDeptChange={setDeptFilter}
          />

          {isLoading ? (
            <div className="bg-white border border-gray-100 rounded-2xl p-10 text-center text-gray-400 text-sm">
              Loading jobs...
            </div>
          ) : (
            <JobsTable
              jobs={jobs}
              totalFilteredCount={totalFilteredCount}
              totalJobsCount={totalJobsCount}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              actionLoadingId={actionLoadingId}
              onView={handleView}
              onEdit={handleEdit}
              onPause={handlePause}
              onResume={handleResume}
              onClose={handleClose}
              onDelete={handleDelete}
            />
          )}
        </div>

        <div className="space-y-6">
          <JobSummaryWidget />
          <RecentActivityWidget />
          <UpgradePlanWidget onUpgradeClick={handleUpgradeClick} />
        </div>
      </div>

      {viewingJobId && (
        <ViewJobModal jobId={viewingJobId} onClose={() => setViewingJobId(null)} />
      )}
    </div>
  );
}